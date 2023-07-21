import { serializable, alias, primitive, object } from "serializr";
class commenter{
  @serializable(alias("name", primitive()))
  name?: string;
}

export class Comments {

  @serializable(alias("commenter", object(commenter)))
  commenter?: commenter;

  @serializable(alias("comment", primitive()))
  comment?: string;

  @serializable(alias("id", primitive()))
  id?: string;

  @serializable(alias("created_at", primitive()))
  createdAt?: string;

  @serializable(alias("updated_at", primitive()))
  updatedAt?: string;

  @serializable(alias("container", primitive()))
  container?: string;

}
