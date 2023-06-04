import ApiService from "@/services/ApiService";

interface ICompany {
    company_id: number
    language: string
}

export default {
    state: {
        company: {},
        companyName: '',
        genericPageValues: {},
    },
    getters: {
        getCompany(state: any) {
            return state.company;
        },
        getCompanyName(state: any) {
            return state.companyName;
        },
        getGenericPage(state: any) {
            return state.genericPageValues;
        },
    },
    mutations: {
        setCompany(state: any, payload: any) {
            state.company = payload;
        },
        setCompanyName(state: any, payload: any) {
            state.companyName = payload;
        },
        setGenericPage(state: any, payload: any) {
            state.genericPageValues = payload;
        },
    },
    actions: {
        async loadCompany({ commit }: any, payload: ICompany) {
            const company_id: number = payload.company_id;
            const language: string = payload.language;

            const companyObject: any = await ApiService.getCompany(company_id, language);
            const company: object = companyObject.data;

            commit('setCompany', company);
        },
    }
};
