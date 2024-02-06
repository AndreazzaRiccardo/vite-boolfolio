<script>
import { store } from '../store';
import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            name: '',
            lastname: '',
            phone: '',
            message: '',
            store,
            result: {
                show: false,
                success: Boolean,
                message: ''
            },
            errors: {},
            loading: false
        }
    },

    methods: {
        sendForm() {
            this.loading = true;
            const data = {
                name: this.name,
                lastname: this.lastname,
                email: this.email,
                phone_number: this.phone,
                message: this.message
            };

            axios.post(`${this.store.serverUrl}/api/leads`, data).then(resp => {
                if (resp.data.success) {
                    this.result.show = true;
                    this.result.success = true;
                    this.result.message = 'THANKS FOR CONTACTING US'

                    this.name = '';
                    this.lastname = '';
                    this.email = '';
                    this.phone = '';
                    this.message = '';
                } else {
                    this.result.show = true;
                    this.result.success = false;
                    this.result.message = 'THE DATA IS INCORRECT'
                    this.errors = resp.data.errors
                }
            }).finally(() => {
                this.loading = false;
            })
        }
    }
}
</script>

<template>
    <main>
        <div class="container text-light fs-5 py-5">
            <h2 class="text-center mb-5">Contact us</h2>
            <div class="row justify-content-center">
                <div class="col-6 bg-secondary rounded-3 p-4">

                    <div :class="[result.success ? 'alert-success' : 'alert-danger']" v-if="result.show != ''"
                        class="alert">
                        {{ result.message }}
                    </div>

                    <form @submit.prevent="sendForm">
                        <div class="mb-3">
                            <div>
                                <label for="email" class="form-label">Email address</label>
                                <input v-model.trim="email" type="email" class="form-control" id="email">
                            </div>
                            <div v-if="errors && errors.email">
                                <div class="invalid-feedback d-inline-block" v-for="error in errors.email">
                                    {{ error }}
                                </div>
                            </div>
                        </div>

                        <div class="mb-3">
                            <div>
                                <label for="name" class="form-label">Name</label>
                                <input v-model.trim="name" type="text" class="form-control" id="name">
                            </div>
                            <div class="invalid-feedback d-inline-block" v-if="errors && errors.name">
                                <div v-for="error in errors.name">
                                    {{ error }}
                                </div>
                            </div>
                        </div>

                        <div class="mb-3">
                            <div>
                                <label for="lastname" class="form-label">Lastname</label>
                                <input v-model.trim="lastname" type="text" class="form-control" id="lastname">
                            </div>
                            <div class="invalid-feedback d-inline-block" v-if="errors && errors.lastname">
                                <div v-for="error in errors.lastname">
                                    {{ error }}
                                </div>
                            </div>
                        </div>

                        <div class="mb-3">
                            <div>
                                <label for="phone" class="form-label">Phone Number</label>
                                <input v-model.trim="phone" type="tel" class="form-control" id="phone">
                            </div>
                            <div class="invalid-feedback d-inline-block" v-if="errors && errors.phone">
                                <div v-for="error in errors.phone">
                                    {{ error }}
                                </div>
                            </div>
                        </div>

                        <div class="mb-3">
                            <div>
                                <label for="message" class="form-label">Message</label>
                                <textarea v-model.trim="message" class="form-control" id="message" rows="3"></textarea>
                            </div>
                            <div class="invalid-feedback d-inline-block" v-if="errors && errors.message">
                                <div v-for="error in errors.message">
                                    {{ error }}
                                </div>
                            </div>
                        </div>

                        <button :disabled="loading === true" class="btn btn-light">{{ loading === true ? 'WAIT' : 'SEND'
                        }}</button>
                    </form>
                </div>
            </div>
        </div>
    </main>
</template>

<style lang="scss"></style>