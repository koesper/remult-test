import {Component, OnInit} from '@angular/core';
import { remult } from 'remult';
import { Product } from '../shared/product';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  productRepo = remult.repo(Product)
  products: Product[] = []
  ngOnInit() {
    this.productRepo.find({
      limit: 5,
      orderBy: { createdAt:"asc" },
      where: { "foo": {$ne: "first"} }
    }).then(items => this.products = items)
  }

  public newThing(){
      this.addTask();
  }



  async addTask() {
    try {
      const newTask = await this.productRepo.insert({ foo: "123" })
      this.products.push(newTask)

    } catch (error: any) {
      alert(error.message)
    }
  }
}
