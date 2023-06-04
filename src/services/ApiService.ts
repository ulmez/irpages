import Api from '@/services/Api';

export default {
    async getCompany(company_id: number, language: string): Promise<object> {
        return await Api().get(`/company/${company_id}/${language}`);
    },
}
