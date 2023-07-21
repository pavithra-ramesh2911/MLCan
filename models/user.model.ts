
import {serializable, alias, primitive} from 'serializr';


export class User {

  
    @serializable(alias('email', primitive()))
    email?: string;

    @serializable(alias('password', primitive()))
    password?: string;

    @serializable(alias('name', primitive()))
    name?: string;

    @serializable(alias('id', primitive()))
    id?: string;

    @serializable(alias('uid', primitive()))
    uid?: string;

    @serializable(alias('phone', primitive()))
    phone?: string;

    @serializable(alias('active', primitive()))
    active?: boolean;

    @serializable(alias('admin', primitive()))
    admin?: boolean;

}
