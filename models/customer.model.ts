import { serializable, alias, primitive, object, list } from "serializr";


export class Customer {
    @serializable(alias("name", primitive()))
    name: string = "";
  }



  