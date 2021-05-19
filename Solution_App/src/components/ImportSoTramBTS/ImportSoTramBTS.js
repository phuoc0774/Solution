import Vue from "vue";
import $ from "jquery";
import XLSX from "xlsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Loader from "../../components/share/Loader";
import store from '../../store/appstore';
//
import ResponsitoryFactory from "../../service/factory/responsitoryfactory";
const SoTramRes = ResponsitoryFactory.get("sotrambts");
const KhoaSoTramRes = ResponsitoryFactory.get("khoasotrambts");
//Gobal
var arrSoTram_ = [];
var arrSoTram_Thang = [];
var arrSoTram_Nam = [];
var opStatus = { noData: 0, importData: 1, loadData: 2 };
var objKhoaST = //objKhoaSoTramBTS
{
  arrKhoaThang: [], objKhoaThang: {},
  arrKhoaTruoc: [], objKhoaTruoc: {},
  arrKhoaSau: [], objKhoaSau: {},
};



export default {
  name: "ImportSoTramBST",
  components: {
    Loader,
  },
  data() {
    return {
      isLoading: false,
      status: opStatus.noData,
      filename: "No file selected",
      listFileUpload: [],
      fileUpload: Object(),
      isDelete: false,
      arrSoTram: [],
      intMonth: 0,
      intYear: 0,
      boolKhoaBang: false,
      intRole: -1,
      //const
      opRole: {'admin': '1', 'user': '2'},
    };
  },
  mounted() {
    this.initialize();
  },
  props: {
    //msg: String
  },
  methods: {
    async initialize() {
      var self = this;

      //Gán giá trị optionSet tháng/ năm
      var sectYear = $("#sectYear");
      sectYear.append(new Option("", 0));
      for (let index = 1990; index < 2031; index++) {
        sectYear.append(new Option(index, index));
      }
      // đăng kí sự kiện
      $("#multi-file-hmis").change(function(event) {
        self.readFileImport(event);
      });
      //
      await self.loadObjectKhoaSoTramBTS();
      self.intRole = store.state.user.roles;
      console.log(store.state.user);
    },
    async loadObjectKhoaSoTramBTS(){
      var self = this;
      //objKhoaSoTramBTS
      objKhoaST =
      {
        arrKhoaThang: [], objKhoaThang: {},
        arrKhoaTruoc: [], objKhoaTruoc: {},
        arrKhoaSau: [], objKhoaSau: {},
      };
      console.log(`loadObjectKhoaSoTramBTS()`);
      var data = [];
      await KhoaSoTramRes.get().then(function (res) {
        data = res.data && res.data.data;
      });
      // console.log(data);

      //sort giảm dần
      data = data.sort(function (e1, e2) {
        if(e1.nam < e2.nam) return 1;
        if(e1.nam > e2.nam) return -1;
        if(e1.thang < e2.thang) return 1;
        if(e1.thang > e2.thang) return -1;
        return 0;
      });
      // data.forEach(element => { console.log(`${element.nam} ${element.thang}`);});
      var arrKhoaThang = data.filter(_ => _.trang_thai == 1);         // khóa tháng
      var arrKhoaThang_Truoc = data.filter(_ => _.trang_thai == 2);   // khóa tháng giai đoạn trước
      var arrKhoaThang_Sau = data.filter(_ => _.trang_thai == 3);     // khóa tháng giai đoạn sau (chưa làm)

      //Khóa tháng
      for (let i = 0; i < arrKhoaThang.length; i++) {
        const e = arrKhoaThang[i];
        objKhoaST.arrKhoaThang.push({thang: e.thang, nam: e.nam});
        if(!objKhoaST.objKhoaThang[e.nam]){
          objKhoaST.objKhoaThang[e.nam] = {};
        }
        objKhoaST.objKhoaThang[e.nam][e.thang] = true;
      }
      //Khóa tháng trước
      for (let i = 0; i < arrKhoaThang_Truoc.length; i++) {
        const e = arrKhoaThang_Truoc[i];
        objKhoaST.arrKhoaTruoc.push({thang: e.thang, nam: e.nam});
        if(!objKhoaST.objKhoaTruoc[e.nam]){
          objKhoaST.objKhoaTruoc[e.nam] = {};
        }
        objKhoaST.objKhoaTruoc[e.nam][e.thang] = true;
      }
      // console.log(objKhoaST);
      return objKhoaST;
    },
    deleteFile() {
      var self = this;
      this.filename = "No file selected";
      this.fileUpload = Object();
      this.listFileUpload = [];
      $("#multi-file").val("");
      $("#multi-file-hmis").val("");
      //
      self.arrSoTram = [];
      arrSoTram_.length = 0;
      arrSoTram_Thang.length = 0;
      arrSoTram_Nam.length = 0;
      self.status = opStatus.noData;

      $("#sectMonth option").css("color", "#000000");
      $("#sectYear option").css("color", "#000000");
      $("#sectMonth option").css("font-weight", "normal");
      $("#sectYear option").css("font-weight", "normal");

    },
    importFile() {
      console.log("importFile");
      var self = this;
      self.deleteFile();
      self.intMonth =0;
      self.intYear=0;
      var sectMonth = $("#sectMonth"), sectYear = $("#sectYear");
      sectMonth.val(0);
      sectYear.val(0);
      $("#multi-file-hmis").click();
    },
    readFileImport: async function(event) {
      console.log("readFileImport"); 
      var self = this;
      if (event.target.files[0] == null) {
        // self.deleteFile();
        return;
      }

      self.isLoading = true;
      self.fileUpload = event.target.files[0];
      self.filename = event.target.files[0].name;
      var files = event.target.files[0];
      var reader = new FileReader();
      //
      reader.onload = async function(e) {
        console.log("reader.onload");
        var data = e.target.result;
        var workbook = XLSX.read(data, {
          type: "binary",
        });

        let sheetName = workbook.SheetNames[0];
        let worksheet = workbook.Sheets[sheetName];
        var XL_row_object = XLSX.utils.sheet_to_row_object_array(worksheet);
        arrSoTram_ = JSON.parse(JSON.stringify(XL_row_object)); // to httpUpdate request
        var _arrSoTram = JSON.parse(JSON.stringify(XL_row_object)); // to V-binding
        for (let index = 0; index < _arrSoTram.length; index++) {
          var em = _arrSoTram[index];
          var em_ = arrSoTram_[index];
          //arrSoTram_
          var d = null;
          if (em.ngayphatsong) {
            d = self.excelDateToJSDate(em.ngayphatsong);
            em.ngayphatsong = self.getStr3Date(d) || "";
            em_.ngayphatsong = d.toISOString();
          }
          if (em.ngaynhapks) {
            d = self.excelDateToJSDate(em.ngaynhapks);
            em.ngaynhapks = self.getStr3Date(d) || "";
            em_.ngaynhapks = d.toISOString();
          }
          if (em.ngay_cn) {
            d = self.excelDateToJSDate(em.ngay_cn);
            em.ngay_cn = self.getStr3Date(d) || "";
            em_.ngay_cn = d.toISOString();
          }
          //userid, ngày CN
          em_.ngay_cn = new Date().toISOString();
          em_.nguoi_cn= store.state.user.id || null;
          //_arrSoTram -> self.arrSoTram
          em.thang = em.thang || "";
          var _thang = (em.thang = em.thang || "");
          var _nam = (em.nam = em.nam || "");
          if (_thang && _thang > 0 && _thang <= 12) {
            if (!arrSoTram_Thang.includes(_thang)) {
              arrSoTram_Thang.push(_thang);
            }
          }
          if (_nam && _nam > 1900 && _nam < 2100) {
            if (!arrSoTram_Nam.includes(_nam)) {
              arrSoTram_Nam.push(_nam);
            }
          }
        }//foreach(_arrSoTram.length)
        self.arrSoTram = _arrSoTram;

        //popularize value: tháng/năm
        var sectMonth = $("#sectMonth"), sectYear = $("#sectYear");
        sectMonth.val(0);
        sectYear.val(0);
        var thang, nam;
        if (arrSoTram_Thang.length == 1){
          thang = self.intMonth = arrSoTram_Thang[0];
          sectMonth.val(self.intMonth); 
        }
        if (arrSoTram_Nam.length == 1){
          nam = self.intYear = arrSoTram_Nam[0];
          sectYear.val(self.intYear); 
        }

        //Tô màu: tháng/năm
        var opsThang = $("#sectMonth option"),
          opsNam = $("#sectYear option");
        opsThang.each(function(i, em) {
          var val = Number(em.value);
          if (arrSoTram_Thang.includes(val)) {
            em.style.color = "blue";
            em.style.fontWeight="bold";

          }
        });
        opsNam.each(function(i, em) {
          var val = Number(em.value);
          if (arrSoTram_Nam.includes(val)) {
            em.style.color = "blue";
             em.style.fontWeight="bold";
            //  $(this).addClass("uutien");
            // em.style.textDecoration = "underline";
            // $(this).css("text-decoration", "underline");
            //  $(this).addClass("text-decorationunderline");
          }
        });

        self.isLoading = false;
        self.status = 1;
        self.checkDaCoDuLieu(thang, nam);
        self.checkKhoaBang(true, thang,  nam, true);
      }; //reader.onload

      reader.onerror = function(ex) {
        self.isLoading = false;
        console.log(ex);
      };
      reader.readAsBinaryString(files);
    }, //readFileImport()
    importToDB: async function() {
      var self = this;
      console.log("uploaToBB");
      if (self.status != opStatus.importData) {
        self.showNotify(`Vui lòng import file để thực hiện chức năng!`, 2);
        return;
      }
      //
      var sectMonth = $("#sectMonth"),
        sectYear = $("#sectYear");
      self.intMonth = Number(sectMonth.val());
      self.intYear = Number(sectYear.val());
      if (self.arrSoTram.length < 1) {
        self.showNotify(`Vui lòng load dữ liệu để thực hiện chức năng!`, 2);
        return;
      }
      if (self.intMonth < 1 || self.intYear < 1) {
        self.showNotify(`Vui lòng chọn tháng/ năm để thực hiện!`, 2);
        return;
      }
      //check khóa bảng
      if(self.checkKhoaBang()){
        return;
      }
      // Cảnh báo cập nhật thêm
      var records = await self.checkDaCoDuLieu(self.intMonth, self.intYear, false);
      if(records.length > 0){
        self.$confirm(
        {
          message: `Đã có ${records.length} dòng dữ liệu cho tháng ${self.intMonth}/${self.intYear}. Vẫn thực hiện import?`,
          button: {yes: "Đồng ý", no: "Thoát"},
          callback: confirm => {
            if(confirm){
              self._importToDB();
            }
          }
        });
      }else{
        self._importToDB();
      }//var objCreateAll = { check: 1, arr: arrSoTram_ };
    },
    _importToDB(){
      var self=this;
      self.isLoading = true;
      SoTramRes.createAll(arrSoTram_).then(function(res) {
        if (res.data.success) {
          for (let index = 0; index < res.data.data.length; index++) {
            const element = res.data.data[index];
            if (!self.arrSoTram[index].id) {
              self.arrSoTram[index].id = element.id;
            }
          }
          self.showNotify(`Import thành công`, 1);
        } else {
          self.showNotify(`Import không thành công`, 2);
          console.log(res);
        }
        self.isLoading = false;
        self.status = opStatus.loadData;
      });
    },
    async onChangeSectMonth() {
     
      var self = this;
      var sectMonth = $("#sectMonth"),
        sectYear = $("#sectYear");
      self.intMonth = Number(sectMonth.val());
      self.intYear = Number(sectYear.val());
      //
      if (self.isLoading || self.status == opStatus.noData) return;
      if (self.status == opStatus.importData && self.arrSoTram.length == 0)
        { console.log('onChangeSectMonth:inoge'); return;}
      if (self.status == opStatus.loadData) {
        self.deleteFile();
        return;
      }
      if (self.intMonth == 0) {console.log('onChangeSectMonth:inoge'); return;}
      self.isLoading = true;
      console.log("onChangeSectMonth");

      //update
      for (let index = 0; index < arrSoTram_.length; index++) {
        var em = arrSoTram_[index];
        var _thang = em.thang || "";
        var _nam = em.nam || "";
        if (_thang != self.intMonth) {
          em.thang = self.intMonth;
          self.arrSoTram[index].thang = self.intMonth;
        }
      } //foreach(arrSoTram_.length)
      setTimeout(self.hideLoading, 100);
      self.checkDaCoDuLieu(self.intMonth, self.intYear);
      self.checkKhoaBang();
    },
    async onChangeSectYear() {
      var self = this;
      var sectMonth = $("#sectMonth"),
        sectYear = $("#sectYear");
      self.intMonth = Number(sectMonth.val());
      self.intYear = Number(sectYear.val());
      //
      if (self.isLoading || self.status == opStatus.noData) return;
      if (self.status == opStatus.importData && self.arrSoTram.length == 0)
        {console.log('onChangeSectYear: Inoge'); return;}
      if (self.status == opStatus.loadData) {
        self.deleteFile();
        return;
      }
      if (self.intYear == 0) {console.log('onChangeSectYear: Inoge'); return;}
      self.isLoading = true;
      console.log("onChangeSectYear");

      //update
      for (let index = 0; index < arrSoTram_.length; index++) {
        var em = arrSoTram_[index];
        var _thang = em.thang;
        var _nam = em.nam;
        if (_nam != self.intYear) {
          em.nam = self.intYear;
          self.arrSoTram[index].nam = self.intYear;
        }
      } //foreach(arrSoTram_.length)

      setTimeout(self.hideLoading, 100);
      self.checkDaCoDuLieu(self.intMonth, self.intYear);
      self.checkKhoaBang();
    },
    checkKhoaBang(showNotify = true, _thang, _nam, params){
      //  console.log(`checkKhoaBang(${_thang} ${_nam})`);
      var self = this;
      self.boolKhoaBang = false;
      //
      var thang = self.intMonth;
      var nam = self.intYear;
      if(params){
        thang = _thang;
        nam = _nam;
      }
      console.log(`checkKhoaBang(${thang} ${nam}): ${self.intMonth} ${self.intYear}`);
      var isBreak = false;
      if (!thang || !nam) isBreak = true;
      if (thang < 1 || thang > 12) isBreak = true;
      if (nam < 1000 || nam > 2100) isBreak = true;
      if (isBreak) {
        return self.boolKhoaBang;
      }

      var strMessage = "";
      var objKhoaThang = objKhoaST.objKhoaThang;
      var arrKhoaTruoc = objKhoaST.arrKhoaTruoc;
      // Khóa tháng
      if(objKhoaThang[nam] && objKhoaThang[nam][thang] === true){
        self.boolKhoaBang = true;
        strMessage = `Bảng Số/Trạm BTS đã khóa ở tháng này!`;
      }
      // Khóa giai đoạn (trước)
      else if(arrKhoaTruoc.length > 0){
        var objKhoaTruoc = arrKhoaTruoc[0];
        if(nam < objKhoaTruoc.nam) self.boolKhoaBang = true;
        if(nam == objKhoaTruoc.nam && thang <= objKhoaTruoc.thang)
          self.boolKhoaBang = true;
        //
        if(self.boolKhoaBang == true)
          strMessage = `Bảng Số/Trạm BTS đã khóa đến ${objKhoaTruoc.thang}/${objKhoaTruoc.nam}!`;
      }
      if(showNotify && self.boolKhoaBang){
        self.showNotify(strMessage,2);
      }
      return self.boolKhoaBang;
    },
    loadRecordSoTram() {
      console.log(`loadRecordSoTram()`);
      var self = this;
      self.deleteFile();
      //
      var thang = self.intMonth, nam = self.intYear;
      var isBreak = false;
      if (!thang || !nam) isBreak = true;
      if (thang < 1 || thang > 12) isBreak = true;
      if (nam < 1000 || nam > 2100) isBreak = true;
      if (isBreak) {
        self.showNotify("Vui lòng chọn tháng/năm để thực hiện chức năng!",2);
        return;
      }
      self.status = opStatus.loadData;

      self.isLoading = true;
      SoTramRes.getByThangNam(thang, nam).then(function(res) {
        var data = res.data && res.data.data;
        arrSoTram_ = JSON.parse(JSON.stringify(data));
        //
        for (let index = 0; index < data.length; index++) {
          var em = data[index];
          if (em.ngayphatsong) {
            em.ngayphatsong = self.getStr3Date(new Date(em.ngayphatsong));
          }
          if (em.ngaynhapks) {
            em.ngaynhapks = self.getStr3Date(new Date(em.ngaynhapks));
          }
          if (em.ngay_cn) {
            em.ngay_cn = self.getStr3Date(new Date(em.ngay_cn));
          }
        }
        self.arrSoTram = data;
        self.isLoading = false;
      });
    },
    deleteData: async function() {
      console.log(`deleteData`);
      var self = this;
      if (self.status != opStatus.loadData) {
        self.showNotify(`Vui lòng load dữ liệu để thực hiện chức năng xóa!`, 2);
        return;
      }
      if (self.arrSoTram.length == 0) {
        self.showNotify(`Không có dữ liệu theo tháng/năm để xóa!`, 2);
        return;
      }
      if (self.checkKhoaBang()) {
        return;
      }//<--CONDITION

      //EXE (YES/NO)
      self.$confirm(
      {
        message: `Thực hiện xóa ${self.arrSoTram.length} dòng dữ liệu?`,
        button: {yes: "Đồng ý", no: "Thoát"},
        callback: confirm => {
          if(confirm){
            self.isLoading = true;
            var ids = [];
            arrSoTram_.forEach(element => {
              ids.push({"id": element.id});
            });// var ids = arrSoTram_.map(_ => {_.id});        _ => {id: _.id}

            SoTramRes.deleteAll(ids).then(function (res) {
              self.deleteFile();
              self.isLoading = false;
              self.showNotify(`Đã xóa thành công!`, 1);
            });
          }
        }
      });
    },
    lockRecordSoTram: function() {
      console.log(`lockRecordSoTram()`);
      var self = this;
      self.deleteFile();
      // self.status = opStatus.loadData;
      //
      var thang = self.intMonth, nam = self.intYear;
      var isBreak = false;
      if (!thang || !nam) isBreak = true;
      if (thang < 1 || thang > 12) isBreak = true;
      if (nam < 1000 || nam > 2100) isBreak = true;
      if (isBreak) {
        self.showNotify("Vui lòng chọn tháng/năm để thực hiện chức năng!",2);
        return;
      }//<--CONDITION

      //EXE (YES/NO)
      self.$confirm({
        message: `Chọn hình thức khóa bảng?`,
        button: {yes: "Khóa tháng", no: "Khóa giai đoạn"},
        callback: confirmHTK => {
          var strConfirm = `Xác nhận không cho phép thay đổi dữ liệu tháng ${self.intMonth}/${self.intYear}?`;
          if(!confirmHTK)
              strConfirm = `Xác nhận không cho phép thay đổi dữ liệu đến giai đoạn ${self.intMonth}/${self.intYear}?`;
          self.$confirm({
            message: strConfirm,
            button: {yes: "Đồng ý", no: "Thoát"},
            callback: async (confirm) =>
            {
              if(!confirm) return;
              var data = null;
               await KhoaSoTramRes.getByQueryString(self.intMonth, self.intYear).then(function (res) {
                data = res.data && res.data.data;
              });
              // console.log(data);
              if(data.length > 0){
                self.showNotify(`Đã có khóa bảng vào ${self.intMonth}/${self.intYear}`);
                return;
              }

              self.isLoading = true;
              var objKhoaSoTram = {thang: self.intMonth, nam: self.intYear, trang_thai: 1, ngay_cn: new Date().toISOString()};
              objKhoaSoTram.nguoi_cn =  Number(store.state.user.id);
              //EXE
              try {
                //EXE1: "Hoàn tất tháng hiện tại"
                if(confirmHTK == true)
                {
                  objKhoaSoTram.trang_thai = 1;
                  KhoaSoTramRes.create(objKhoaSoTram).then(function (data) {
                    // self.isLoading = false;
                    self.loadObjectKhoaSoTramBTS();
                    self.showNotify("Đã khóa bảng theo tháng");
                  });
                }else
                //EXE2: "Hoàn tất đến giai đoạn hiện tại"
                {
                  objKhoaSoTram.trang_thai = 2;
                  KhoaSoTramRes.create(objKhoaSoTram).then(function (data) {
                    self.loadObjectKhoaSoTramBTS();
                    self.showNotify("Đã khóa bảng theo giai đoạn");
                  });
                }
              } catch (error) {
                self.isLoading = false;
                self.showNotify(`Không khóa bảng thành công!\n${error.message}`);
              }
            }
          });//$confirm: "Đồng ý", "Thoát"
        }
      });//$confirm: "Khóa tháng", "khóa giai đoạn"
    },//lockRecordSoTram()

    checkDaCoDuLieu: async function(thang, nam, showNotify = true) {
      var self = this;
      if(!thang || !nam) return;
      if (thang < 1 || thang > 12) return;
      if (nam < 1000 || nam > 2100) return;

      var res = await SoTramRes.getByThangNam(thang, nam).then(function(res) {
        var data = res.data && res.data.data;
        if (showNotify && data.length > 0) {
          self.showNotify( `Đã có ${data.length} dòng dữ liệu cho tháng ${thang}/${nam}!`, 2); //Vui lòng thực hiện chức năng xóa nếu cập nhật lại.
        }
        return data;
      });
      return res;
    },
    showNotify(text, type = 1, group = "global") {
      var self = this;
      self.isLoading = false;
      var strType = "is-success";
      if (type == 2) strType = "is-warning";
      self.$notify({
        group: group,
        type: strType,
        text: text,
      });
    },
    hideLoading() {
      var self = this;
      self.isLoading = false;
    },
    showConfirm: async function(message, arrButton){
      let self = this;
      if(arrButton.length == 0) return;
      //
      var objButon = {};
      if(arrButton.length >= 1)
        objButon.yes = arrButton[0];
      if(arrButton.length >= 2)
        objButon.no = arrButton[1];

      //EXE
      var objRes = {data: null};
      await this.$confirm(
      {
        message: message,
        button: objButon,
        callback: confirm => {
          objRes.data = confirm;
        }
      });
      return objRes;
    },
    excelDateToJSDate(date) {
      return new Date(Math.round((date - 25569) * 86400 * 1000));
    },
    getStr3Date(date) {
      if (!(date instanceof Date)) return "";
      //
      var y = date.getFullYear();
      var m = date.getMonth();
      var d = date.getDate();
      if (++m < 10) m = "0" + m;
      if (d < 10) d = "0" + d;
      return `${d}/${m}/${y}`;
    },
  }, //methods:{}
}; //export