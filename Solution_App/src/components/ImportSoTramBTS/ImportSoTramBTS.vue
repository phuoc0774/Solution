<template>
  <div>
    <div class="k t main-form">
      <div class="k head-form">
        <!-- chọn file -->
        <span class="k t head-title">Upload Số Trạm/BTS</span>
        <span class="k t note-text">Chọn file</span>
        <div class=" k bd-input-file">
          <span class="k t name-file">{{
            filename != null ? filename : "Không có file được chọn"
          }}</span>
          <span class="t bnt-select-file" v-on:click="importFile()"
            >Browser</span
          >
        </div>

        <!-- chọn tháng năm -->
        <span class="k t note-text">Chọn tháng/năm</span>
        <div class=" k bd-input-file">
          <select @change="onChangeSectMonth()" id="sectMonth">
            <option value="0"></option>
            <option value="1">01</option>
            <option value="2">02</option>
            <option value="3">03</option>
            <option value="4">04</option>
            <option value="5">05</option>
            <option value="6">06</option>
            <option value="7">07</option>
            <option value="8">08</option>
            <option value="9">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
          <select @change="onChangeSectYear()" id="sectYear"> </select>
          <button id="LoadRecordSoTra" v-on:click="loadRecordSoTram()">
            Load Data
          </button>
          <button id="DeleteDat" v-on:click="deleteData()">Delete Data</button>
          <button id="CloseThangNa" v-if="intRole == opRole.admin" v-on:click="lockRecordSoTram()">
            Lock Data
          </button>
        </div>

        <!-- import button -->
        <input
          style="display:none" id="multi-file-hmis" class="hidden" type="file"
          accept=".xls,.xlsx,.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        />
        <span class="k t bnt-import-file" v-on:click="importToDB()">Import</span>
      </div>

      <Loader v-if="isLoading" />
      <div v-else class="">  <!-- k body-form -->
        <div class="scrollmenu">
          <table id="tblSoTram" class="table">
            <thead>
              <tr>
                <th>STT</th>
                <th>ID</th>
                <th>Tháng</th>
                <th>Năm</th>
                <th>Loại Trạm</th>
                <th>Site Name</th>
                <th>Site Name (VNP)</th>
                <th>Long Y</th>
                <th>Long X</th>
                <th>Ngày Phát Sóng</th>
                <th>Ngày Nhập KS</th>
                <th>Số Nhà</th>
                <th>Tên Ấp</th>
                <th>Tên Khu</th>
                <th>Tên Đường</th>
                <th>Tên Phường</th>
                <th>Tên Quận</th>
                <th>Trạng Thái</th>
                <th>Ngày Cập Nhật</th>
                <th>Người Cập Nhật</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class=""
                v-for="(obj, index) in arrSoTram"
                :key="index"
                v-bind:class="{ 'bd-table-sd': index % 2 == 0 }"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ obj.id || "" }}</td>
                <td>{{ obj.thang || "" }}</td>
                <!-- <td v-on:change="onChangetdMonth(this, this.value)">{{obj.thang || ""}}</td> -->
                <!-- <td :onchange="onChangetdMonth(this)">{{obj.thang || ""}}</td> -->
                <td>{{ obj.nam || "" }}</td>
                <td>{{ obj.loai_tram || "" }}</td>
                <td>{{ obj.sitename || "" }}</td>
                <td>{{ obj.sitename_vnp || "" }}</td>
                <td>{{ obj.long_y || "" }}</td>
                <td>{{ obj.lat_x || "" }}</td>
                <td>{{ obj.ngayphatsong || "" }}</td>
                <td>{{ obj.ngaynhapks || "" }}</td>
                <td>{{ obj.sonha || "" }}</td>
                <td>{{ obj.tenap_vn || "" }}</td>
                <td>{{ obj.tenkhu_vn || "" }}</td>
                <td>{{ obj.tenduong_vn || "" }}</td>
                <td>{{ obj.tenphuong_vn || "" }}</td>
                <td>{{ obj.tenquan_vn || "" }}</td>
                <td>{{ obj.trang_thai || "" }}</td>
                <td>{{ obj.ngay_cn || "" }}</td>
                <td>{{ obj.nguoi_cn || "" }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!----------------------------loading------------------------->
      <div class="loading"></div>
    </div>
  </div>
</template>

<style scoped>
@import url("../../css/config.css");
@import url("../../css/hmis.css");
.uutien{
  text-decoration: underline;
}
</style>

<script src="./ImportSoTramBTS.js"></script>
