<template>
  <div  class="columns is-centered">
    <div class="column is-6">
        <!-- <h1 class="title">{{model.productId || 'New User'}}</h1> -->
        <h2 style="margin-top:10px" class="subtitle">{{isEditProfile? 'UPDATE YOUR PROFILE': `UPDATE USER: ${model.username}`}}</h2>

        <Loader v-if="isLoading" />
        <form id="mainForm" v-else @submit.prevent="onClickUpdateUser">
            <div class="field">
                <input
                :class="{error: validation.hasError('model.username')}"
                v-model="model.username"
                class="input"
                type="text"
                placeholder="User name"
                />
                <p class="help is-danger">{{validation.firstError('model.username')}}</p>
            </div>
            <div class="field">
                <input
                :class="{error: validation.hasError('model.email')}"
                v-model="model.email"
                class="input"
                type="text"
                placeholder="Email"
                />
                <p class="help is-danger">{{validation.firstError('model.email')}}</p>
            </div>
            <!-- Password -->
            <div class="field" v-if="isChangePassword===true">
                <input
                :class="{error: validation.hasError('model.password_old')}"
                v-model="model.password_old"
                class="input"
                type="password"
                placeholder="Old Password"
                />
                <p class="help is-danger">{{validation.firstError('model.password_old')}}</p>
            </div>
            <div class="field" v-if="isChangePassword===true">
                <input
                :class="{error: validation.hasError('model.password')}"
                v-model="model.password"
                class="input"
                type="password"
                placeholder="New Password"
                />
                <p class="help is-danger">{{validation.firstError('model.password')}}</p>
            </div>
            <div class="field"  v-if="isChangePassword===true">
                <input
                :class="{error: validation.hasError('model.password_retype')}"
                v-model="model.password_retype"
                class="input"
                type="password"
                placeholder="Confirm Password"
                />
                <p class="help is-danger">{{getStrValidator('model.password_retype')}}</p>
            </div>
            <!-- /Password -->
            <div class="field">
                <input
                :class="{error: validation.hasError('model.phone')}"
                v-model="model.phone"
                class="input"
                type="text"
                placeholder="Phone"
                />
                <p class="help is-danger">{{validation.firstError('model.phone')}}</p>
            </div>
            <div class="field">
                <input
                :class="{error: validation.hasError('model.address')}"
                v-model="model.address"
                class="input"
                type="text"
                placeholder="Address"
                />
                <p class="help is-danger">{{validation.firstError('model.address')}}</p>
            </div>
            
            <!-- Button -->
            <div class="field">
                <button type="submit" class="button is-info" style="margin-right: 10px;">Update</button>
                <button class="button is-info" style="margin-right: 10px;" @click="onClickCancel">Cancel</button>
                <button class="button is-info" @click="onClickChangePassword" v-if="isChangePassword===false">Change Password</button>
            </div>
        </form>
    </div>
  </div>
</template>

<style scoped>
#mainForm > div > p {
    text-align: left;
}
</style>


<style src="bulma/css/bulma.min.css" scoped></style>
<script src="./UserUpdate.js"></script>