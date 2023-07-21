import { serializable, alias, primitive, object } from "serializr";


export class Activity {

  @serializable(alias("uid", primitive()))
  uid?: string;

  @serializable(alias("id", primitive()))
  id?: string;

  @serializable(alias("activity_status", primitive()))
  activityStatus?: string;

  @serializable(alias("created_at", primitive()))
  createdAt?: string;

  @serializable(alias("activity_type", primitive()))
    activityType?: string;

  @serializable(alias("active", primitive()))
  active?: boolean;

}