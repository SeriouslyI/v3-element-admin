<template>
    <div>
        <el-form :model="class_info" :rules="rules" ref="class_info" label-width="120px" class="demo-ruleForm">
            <el-form-item label="旧密码" prop="old_pass" class="taleft">
                <el-input v-model="class_info.old_pass" type="password"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="u_password" class="taleft">
                <el-input v-model="class_info.u_password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="再次输入密码" prop="re_pass" class="taleft">
                <el-input v-model="class_info.re_pass" type="password"></el-input>
            </el-form-item>
            <el-col :span="11">
                <el-form-item>
                    <el-button type="primary" @click="submitForm">立即修改</el-button>
                </el-form-item>
            </el-col>
        </el-form>
    </div>
</template>
<script>
import qs from 'qs';
    export default {
        data() {
            const validateRePass = (rule, value, callback) => {
                if (value !== this.class_info.u_password) {
                    callback(new Error('两次密码不一致'));
                } else {
                    callback();
                }
            };
            return {
                class_info: {
                    old_pass:'',
                    u_password:'',
                    re_pass:''
                },
                rules: {
                    old_pass: [{
                        required: true,
                        message: '请输入旧密码',
                        trigger: 'blur'
                    }],
                    u_password: [{
                        required: true,
                        message: '请输入新密码',
                        trigger: 'blur'
                    }],
                    re_pass: [{
                        required: true,
                        message: '请再次输入密码',
                        trigger: 'blur'
                    }, {
                        trigger: 'blur',
                        validator: validateRePass
                    }],
                },
            };
        },
        created() {
            // console.log(this.$route.params)
            this.class_info.uid = JSON.parse(window.localStorage.getItem('user')).uid
            console.log(this.class_info)

        },
        methods: {
            submitForm(formName) {
                axios.post(this.global.api_host + '/user/editPassword',
                    qs.stringify(this.class_info)).then((response) => {
                    if(response.data.code === 1){
                        this.$message({
                          message: response.data.message,
                          type: 'success'
                        });
                        window.history.back();
                    }else if(response.data.code === 0){
                        this.$message({
                          message: response.data.message,
                          type: 'error'
                        });
                    }
                }).catch((error) => {
                    console.log(error)
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

        }
    }
</script>
<style lang="stylus">
    .el-input__inner {
        max-width 600px;
    }
</style>