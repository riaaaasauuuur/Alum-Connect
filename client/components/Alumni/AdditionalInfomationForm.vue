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
                                    <h1>Additional Information</h1>
                                </div>
                                <a-divider />
                                <br>
                                <a-row type="flex" :gutter="20">
                                    <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                                        <a-form-model-item label="Course" prop="details.course.name">
                                            <a-input v-model="form.details.course.name" size="large" disabled />
                                        </a-form-model-item>
                                    </a-col>
                                    <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                                        <a-form-model-item label="Date of Graduation">
                                            <a-date-picker style="width: 100%" v-model="form.details.graduatedAt" size="large" disabled />
                                        </a-form-model-item>
                                    </a-col>
                                    <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                                        <a-form-model-item label="Latin Honors">
                                            <a-select v-model="form.details.latinHonors" allowClear class="input-default" placeholder="Please Select">
                                                <a-select-option key="CUM_LAUDE">Cum Laude</a-select-option>
                                                <a-select-option key="MAGNA_CUM_LAUDE">Magna Cum Laude</a-select-option>
                                                <a-select-option key="SUMMA_CUM_LAUDE">Summa Cum Laude</a-select-option>
                                                <a-select-option :key="null">None</a-select-option>
                                            </a-select>
                                        </a-form-model-item>
                                    </a-col>
                                    <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24" v-if="form.details.course.hasBoard">
                                        <a-form-model-item label="Is Board Passer" prop="details.isBoardPasser">
                                            <a-radio-group v-model="form.details.isBoardPasser" button-style="solid" size="large">
                                                <a-radio-button :value="true">Yes</a-radio-button>
                                                <a-radio-button :value="false">No</a-radio-button>
                                            </a-radio-group>
                                        </a-form-model-item>
                                    </a-col>
                                    <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                                        <a-form-model-item label="Current Status" prop="details.isEmployed">
                                            <a-select style="width: 100%" v-model="form.details.isEmployed" size="large" placeholder="Please Select">
                                                <a-select-option :key="true">Employed</a-select-option>
                                                <a-select-option :key="false">Unemployed</a-select-option>
                                            </a-select>
                                        </a-form-model-item>
                                    </a-col>
                                    <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                                        <a-form-model-item label="Current Work Position" prop="details.workPosition">
                                            <a-input v-model="form.details.workPosition" size="large" :disabled="Object.keys(this.rules).length === 1" />
                                        </a-form-model-item>
                                    </a-col>
                                    <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                                        <a-form-model-item label="Date of Current Employment" prop="details.dateHired">
                                            <a-date-picker v-model="form.details.dateHired" size="large" style="width: 100%" :disabled="Object.keys(this.rules).length === 1" />
                                        </a-form-model-item>
                                    </a-col>
                                    <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                                        <a-form-model-item label="Current Nature/Type of Work" prop="details.workType">
                                            <a-input v-model="form.details.workType" size="large" :disabled="Object.keys(this.rules).length === 1" />
                                        </a-form-model-item>
                                    </a-col>
                                    <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                                        <a-form-model-item label="Company Name" prop="details.companyName">
                                            <a-input v-model="form.details.companyName" size="large" :disabled="Object.keys(this.rules).length === 1" />
                                        </a-form-model-item>
                                    </a-col>
                                    <a-col :span="24">
                                        <a-form-model-item label="If your job/work is related to their undergraduate programs" prop="details.isRelated">
                                            <a-radio-group v-model="form.details.isRelated" button-style="solid" size="large" :disabled="Object.keys(this.rules).length === 1">
                                                <a-radio-button :value="true">Yes</a-radio-button>
                                                <a-radio-button :value="false">No</a-radio-button>
                                            </a-radio-group>
                                        </a-form-model-item>
                                    </a-col>
                                </a-row>
                                <br><br>
                                <a-row type="flex" :gutter="10" justify="end">
                                    <a-col>
                                        <a-button v-if="isManage" size="large" shape="round" @click="$emit('back')">Back</a-button>
                                    </a-col>
                                    <a-col>
                                        <a-button type="primary" size="large" shape="round" @click="validate">Submit</a-button>
                                    </a-col>
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
        },
        isManage: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        rules() {
            let requiredRules = this.ruleSetter(['details.isEmployed']);
            const extraRules = this.ruleSetter(['details.workPosition', 'details.dateHired', 'details.workType', 'details.companyName', 'details.isRelated']);

            if(this.form.details.isEmployed) {
                Object.assign(requiredRules, extraRules);
            } else {
                const deleteExtra = ['workPosition', 'dateHired', 'workType', 'companyName', 'isRelated'];
                deleteExtra.forEach(e => delete this.form.details[e]);
            }

            return requiredRules;
        }
    },
    methods: {
        validate() {
            this.$refs.form.validate(valid => {
                if(valid) this.$emit('submit');
                else this.notify("error", "Fill up required fields");
            });
        },
    }
}
</script>
<style>

</style>