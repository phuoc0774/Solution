<template>
  <div  class="columns is-centered">
    <div class="column is-6">
        <!-- <h1 class="title">{{model.productId || 'New User'}}</h1> -->
        <h2 class="subtitle">{{'Create user'}}</h2>

        <Loader v-if="isLoading" />
        <form id="mainForm" v-else @submit.prevent="onClickCreateUser">
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
            <div class="field">
                <input
                :class="{error: validation.hasError('model.password')}"
                v-model="model.password"
                class="input"
                type="text"
                placeholder="Password"
                />
                <p class="help is-danger">{{validation.firstError('model.password')}}</p>
            </div>
            <div class="field">
                <input
                :class="{error: validation.hasError('model.password_retype')}"
                v-model="model.password_retype"
                class="input"
                type="text"
                placeholder="Password"
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
                <button type="submit" class="button is-info" style="margin-right: 10px;">Create</button>
                <button class="button is-info" @click="onClickCancel">Cancel</button>
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
<script src="./UserCreate.js"></script>