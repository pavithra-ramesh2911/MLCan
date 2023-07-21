import { serializable, alias, primitive, object } from "serializr";
class creator{
    @serializable(alias("name", primitive()))
    name?: string;
}
export class Logs{
    
    @serializable(alias("id", primitive()))
    id?: string;
    
    @serializable(alias("form_uid", primitive()))
    uid?: string;
    
    @serializable(alias("curr_status", primitive()))
    currentStatus?: string;

    @serializable(alias("prev_status", primitive()))
    prevStatus?: string;

  @serializable(alias("created_at", primitive()))
  createdAt?: string;

  @serializable(alias("updated_at", primitive()))
  updatedAt?: string;


  @serializable(alias("creator", object(creator)))
  creator?: creator;

  @serializable(alias("container", primitive()))
  container?: string;

  @serializable(alias("form_type", primitive()))
  formType?: string;

}

