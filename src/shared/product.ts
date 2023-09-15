import { Entity, Fields } from "remult"

@Entity("products", {
  allowApiCrud: true,

  defaultOrderBy: { name: "asc" }
})
export class Product {
  @Fields.cuid()
  id = "";

  @Fields.createdAt({includeInApi: false, allowApiUpdate: false})
  createdAt?: Date;

  @Fields.string()
  name = "";

  @Fields.number()
  unitPrice = 0;

  @Fields.string({allowNull :true})
  foo = ""
}
