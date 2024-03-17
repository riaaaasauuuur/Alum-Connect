<template>
    <div>
        <a-card class="personal-info-card">
            <div class="personal-info-card-body">
                <a-spin :spinning="loading">
                    <a-icon slot="indicator" type="loading" style="font-size: 60px;" />
                    <div class="card-body-content">
                        <div class="card-body-form">
                            <a-form-model :model="form" :rules="rules" ref="form">
                                <div class="card-body-title">
                                    <h1>Personal Information</h1>
                                </div>
                                <a-divider />
                                <div class="card-body-avatar">
                                    <a-avatar icon="user" v-if="!user?.details?.avatar" :size="100" />
                                    <a-avatar :src="user?.details?.avatar" v-else :size="100" />
                                    <div class="personal-info-avatar">
                                        <a-upload
                                            class="importUploader"
                                            :multiple="false"
                                            :beforeUpload="(file) => beforeUpload(file)"
                                            accept="image/png, image/jpeg"
                                        >
                                            <a-icon type="edit" class="personal-edit-profile" />
                                        </a-upload>
                                    </div>
                                </div>
                                <br><br>
                                <a-row type="flex" :gutter="20">
                                    <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                                        <a-form-model-item label="First Name" prop="details.firstName">
                                            <a-input v-model="form.details.firstName" size="large" :disabled="!isEdit" />
                                        </a-form-model-item>
                                    </a-col>
                                    <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                                        <a-form-model-item label="Middle Name">
                                            <a-input v-model="form.details.middleName" size="large" :disabled="!isEdit" />
                                        </a-form-model-item>
                                    </a-col>
                                    <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                                        <a-form-model-item label="Last Name" prop="details.lastName">
                                            <a-input v-model="form.details.lastName" size="large" :disabled="!isEdit" />
                                        </a-form-model-item>
                                    </a-col>
                                    <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                                        <a-form-model-item label="Suffix">
                                            <a-input v-model="form.details.suffix" size="large" :disabled="!isEdit" />
                                        </a-form-model-item>
                                    </a-col>
                                    <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                                        <a-form-model-item label="Birthday" prop="details.birthday">
                                            <a-date-picker v-model="form.details.birthday" size="large" style="width: 100%" :disabled="!isEdit" />
                                        </a-form-model-item>
                                    </a-col>
                                    <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                                        <a-form-model-item label="Civil Status" prop="details.civilStatus">
                                            <a-select v-model="form.details.civilStatus" style="width: 100%" size="large" placeholder="Please Select">
                                                <a-select-option key="SINGLE">SINGLE</a-select-option>
                                                <a-select-option key="MARRIED">MARRIED</a-select-option>
                                                <a-select-option key="WIDOWED">WIDOWED</a-select-option>
                                                <a-select-option key="DIVORCED">DIVORCED</a-select-option>
                                            </a-select>
                                        </a-form-model-item>
                                    </a-col>
                                    <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                                        <a-form-model-item label="Gender" prop="details.gender">
                                            <a-radio-group v-model="form.details.gender" button-style="solid" size="large" :disabled="!isEdit">
                                                <a-radio-button value="M">MALE</a-radio-button>
                                                <a-radio-button value="F">FEMALE</a-radio-button>
                                            </a-radio-group>
                                        </a-form-model-item>
                                    </a-col>
                                </a-row>
                                <br><br>
                                <div class="card-body-title">
                                    <h1>Contact Information</h1>
                                </div>
                                <a-divider />
                                <a-row type="flex" :gutter="20">
                                    <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                                        <a-form-model-item label="Street Address" prop="details.street">
                                            <a-input v-model="form.details.street" size="large" />
                                        </a-form-model-item>
                                    </a-col>
                                    <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                                        <a-form-model-item label="City" prop="details.city">
                                            <a-input v-model="form.details.city" size="large" />
                                        </a-form-model-item>
                                    </a-col>
                                    <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                                        <a-form-model-item label="State | Province | Region" prop="details.stateProvinceRegion">
                                            <a-input v-model="form.details.stateProvinceRegion" size="large" />
                                        </a-form-model-item>
                                    </a-col>
                                    <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                                        <a-form-model-item label="Zip | Postal Code" prop="details.zipCode">
                                            <a-input v-model="form.details.zipCode" size="large" />
                                        </a-form-model-item>
                                    </a-col>
                                    <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                                        <a-form-model-item label="Contact Number" prop="details.mobileNumber">
                                            <a-input v-model="form.details.mobileNumber" size="large" />
                                        </a-form-model-item>
                                    </a-col>
                                    <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                                        <a-form-model-item label="Email" prop="email">
                                            <a-input v-model="form.email" disabled size="large" />
                                        </a-form-model-item>
                                    </a-col>
                                </a-row>
                                <br><br>
                                <a-row type="flex" justify="end">
                                    <a-button type="primary" size="large" shape="round" @click="validate">Submit</a-button>
                                </a-row>
                            </a-form-model>
                        </div>
                    </div>
                </a-spin>
            </div>
        </a-card>
    </div>
</template>
<script>
export default {
    props: {
        isEdit: {
            type: Boolean,
            default: false
        },
        user: {
            type: Object,
            default: {}
        },
        form: {
            type: Object,
            default: {}
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        rules() {
            return this.ruleSetter(['details.firstName', 'details.lastName', 'details.civilStatus', 'details.street', 'details.city', 'details.stateProvinceRegion', 'details.birthday', 'details.gender', 'details.zipCode', 'details.mobileNumber', 'email']);
        }
    },
    methods: {
        validate() {
            this.$refs.form.validate(valid => {
                if(valid) this.submit();
                else this.notify("error", "Please fill up required fields");
            });
        },
        async submit() {
            this.$emit('next');
            // try {
            //     this.loading = true;
            //     await this.$axios.put(`/user-details/${this.user?.details?._id}`, this.form);
            //     this.isEdit ? this.notify("success", "Info has been updated successfully") : ;
            // } catch (error) {
            //     this.notifyErrorMessage(error);
            // } finally {
            //     this.loading = false;
            // }
        },
        async beforeUpload(file) {
            try {
                this.loading = true;
                let fd = new FormData();
                fd.append('files', file)

                let { data } = await this.$axios.post(`https://upload-service-alpha.vercel.app/upload`, fd);
                const avatar = data.result[0].url;
                await this.$axios.put(`/user-details/${this.$auth.user?.details?._id}`, { avatar });
                this.notify("success", "Avatar has been changed");
                this.$emit('update');

            } catch (error) {
                this.notifyErrorMessage(error);
            } finally {
                this.loading = false;
            }
        },
    }
}
</script>
<style>
.personal-info-card .ant-card-body {
    padding: 0;
}
.personal-info-card-body {
    padding: 15px;
}
.card-body-title h1 {
    text-align: center;
    font-size: 35px;
    font-weight: 700;
    color: #800000;
    line-height: 30px;
}
.card-body-avatar {
    text-align: center;
}
.personal-info-avatar {
  width: fit-content;
  margin: auto;
  position: relative;
}
.importUploader .ant-upload-list-item {
  display: none;
}
.personal-edit-profile {
  position: absolute;
  bottom: 15px;
  right: -40px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.personal-edit-profile.anticon {
  color: #fff;
}
.personal-edit-profile:hover {
  background: rgba(0, 0, 0, 1);
}
.card-body-form {
    padding: 0 100px;
}
@media screen and (max-width: 850px) {
    .card-body-form {
        padding: 0 20px;
    }
}
@media screen and (max-width: 642px) {
    .card-body-title h1 {
        font-size: 25px;
    }
}
</style>