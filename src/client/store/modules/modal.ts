import Vue from 'vue';

export const MODAL_NAMESPACE = 'modal';

export const OPEN_MODAL = 'openModal';
export const CLOSE_MODAL = 'closeModal';

export interface ModalState {
    displayModal: boolean;
}

export const Modal = {
    state: () => ({
        displayModal: false
    }),
    mutations: {
        openModal(state: ModalState) {
            Vue.set(state, 'displayModal', true);
        },
        closeModal(state: ModalState) {
            Vue.set(state, 'displayModal', false);
        }
    },
    actions: {},
    modules: {}
}