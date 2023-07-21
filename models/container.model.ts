import { alias, custom, list, object, primitive, serializable } from "serializr";
import { Customer} from "./customer.model";


export class Containers {

  @serializable(alias("id", primitive()))
  id?: string;
  
  @serializable(alias("uid", primitive()))
  uid?: string;

  @serializable(alias("name", primitive()))
  name?: string;

  @serializable(alias("yard", primitive()))
  yard?: string;

  @serializable(alias("status", primitive()))
  status?: string;

  @serializable(alias("activity_type", primitive()))
  activityType?: string;

  @serializable(alias("activity_date", primitive()))
  activityDate?: string;

  @serializable(alias("activity_status", primitive()))
  activityStatus?: string;

  @serializable(alias("activity_uid", primitive()))
  activityUid?: string;
  
  @serializable(alias("owner", primitive()))
  owner?: string;

  @serializable(alias("submitter", primitive()))
  submitter?: string;

  @serializable(alias("length", primitive()))
  length?: string;

  @serializable(alias("height", primitive()))
  height?: string;

  @serializable(alias("type", primitive()))
  type?: string;

  @serializable(alias("container", primitive()))
  container?: string;

  @serializable(alias("year", primitive()))
  year?: string;
  
  @serializable(alias("docs", primitive()))
  docs?: string;

  @serializable(alias("customer", object(Customer)))
  customer?: Customer;

  @serializable(alias("customer_name", primitive()))
  customerName?: string;

  @serializable(alias("commenter", primitive()))
  commenter?: string;

}
