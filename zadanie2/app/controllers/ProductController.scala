package controllers

import javax.inject._
import play.api.mvc._
import scala.collection.mutable
import play.api.libs.json.{Json, OFormat}

// Product model
case class Product(id: Long, name: String, price: Double)

// JSON Format
object Product {
  implicit val format: OFormat[Product] = Json.format[Product]
}

@Singleton
class ProductController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  // Temp list of products in cache
  private val productList: mutable.ListBuffer[Product] = mutable.ListBuffer(
    Product(1, "Laptop", 2500.00),
    Product(2, "Phone", 1200.00)
  )

  // GET /products
  def getAll(): Action[AnyContent] = Action {
    Ok(Json.toJson(productList))
  }

  // GET /products/:id
  def getById(id: Long): Action[AnyContent] = Action {
    val productOpt = productList.find(_.id == id)
    productOpt match {
      case Some(product) => Ok(Json.toJson(product))
      case None          => NotFound(s"Product with id=$id not found")
    }
  }

  // POST /products
  def create(): Action[AnyContent] = Action { request =>
    val jsonBody = request.body.asJson
    jsonBody match {
      case Some(json) =>
        val newProduct = json.as[Product]
        val maxId = if (productList.isEmpty) 0 else productList.map(_.id).max
        val productToAdd = newProduct.copy(id = maxId + 1)
        productList += productToAdd
        Created(Json.toJson(productToAdd))
      case None =>
        BadRequest("Invalid JSON data")
    }
  }

  // PUT /products/:id
  def update(id: Long): Action[AnyContent] = Action { request =>
    val jsonBody = request.body.asJson
    jsonBody match {
      case Some(json) =>
        val updatedProduct = json.as[Product]
        productList.indexWhere(_.id == id) match {
          case -1 => NotFound(s"Product with id=$id not found")
          case index =>
            productList.update(index, updatedProduct.copy(id = id))
            Ok(Json.toJson(productList(index)))
        }
      case None =>
        BadRequest("Invalid JSON data")
    }
  }

  // DELETE /products/:id
  def delete(id: Long): Action[AnyContent] = Action {
    productList.indexWhere(_.id == id) match {
      case -1 => NotFound(s"Product with id=$id not found")
      case index =>
        productList.remove(index)
        Ok(s"Product with id=$id deleted.")
    }
  }
}
