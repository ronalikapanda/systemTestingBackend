import Customer from "../models/Customer";
export default (customer: any|Customer) => {
        let response: any = {
                id: customer.id,
                first_name: customer.first_name,
                last_name:customer.last_name,
                email:customer.email,
                mobile:customer.mobile,
                status:customer.status,
         }
        return response
}