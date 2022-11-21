const faker = require('faker')
const boom = require('@hapi/boom')

class ProductsService {

  constructor(){
    this.products = []
    this.generate()
  }

  async generate(){
    const limit = 5;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        name: faker.commerce.productName(),
        id: faker.datatype.uuid(),
        price: parseInt(faker.commerce.price(),10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      })
    }
  }

  async create(data) {
     const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct)
    return newProduct
  }

  find() {
    return new Promise((resolve, reject) =>{
      setTimeout(() =>{
        resolve(this.products)
      },2000)
    })
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id)
    if(!product){
      throw boom.notFound('Product not Found')
    }
    if(product.isBlock === true){
      throw boom.conflict('Product is Conflictive')
    }
    return product
  }

  async update(id, data) {
    const index = this.products.findIndex(item => item.id === id)
    if(index === -1){
      throw boom.notFound('Product noy Found')
    }
    const product = this.products[index]
    this.products[index] = {
      ...product,
      ...data
    }
    return this.products[index]
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id)
    if(index === -1){
      throw boom.notFound('Product noy Found')
    }
    this.products.splice(index, 1)

    return {
      message: "Product Deleted",
      id
    }
  }


}


module.exports = ProductsService;
