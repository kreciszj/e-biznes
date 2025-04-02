package controllers

import javax.inject._
import play.api.mvc._
import scala.collection.mutable
import play.api.libs.json.{Json, OFormat}

// Cart Model
case class Cart(id: Long, user: String, items: List[Long])

object Cart {
  implicit val format: OFormat[Cart] = Json.format[Cart]
}

@Singleton
class CartController @Inject() (cc: ControllerComponents) extends AbstractController(cc) {

  // Example data
  private val cartList: mutable.ListBuffer[Cart] = mutable.ListBuffer(
    Cart(1, "user1", List(1, 2)),        // user1 with products 1 and 2
    Cart(2, "user2", List(2)),
    Cart(3, "user3", List.empty[Long])
  )

  // GET /carts
  def getAll(): Action[AnyContent] = Action {
    Ok(Json.toJson(cartList))
  }

  // GET /carts/:id
  def getById(id: Long): Action[AnyContent] = Action {
    cartList.find(_.id == id) match {
      case Some(cart) => Ok(Json.toJson(cart))
      case None       => NotFound(s"Cart with id=$id not found")
    }
  }

  // POST /carts
  def create(): Action[AnyContent] = Action { request =>
    request.body.asJson match {
      case Some(json) =>
        val newCart = json.as[Cart]
        val maxId = if (cartList.isEmpty) 0 else cartList.map(_.id).max
        val cartToAdd = newCart.copy(id = maxId + 1)
        cartList += cartToAdd
        Created(Json.toJson(cartToAdd))
      case None =>
        BadRequest("Invalid JSON data for Cart")
    }
  }

  // PUT /carts/:id
  def update(id: Long): Action[AnyContent] = Action { request =>
    request.body.asJson match {
      case Some(json) =>
        val updatedCart = json.as[Cart]
        cartList.indexWhere(_.id == id) match {
          case -1 => NotFound(s"Cart with id=$id not found")
          case idx =>
            cartList.update(idx, updatedCart.copy(id = id))
            Ok(Json.toJson(cartList(idx)))
        }
      case None =>
        BadRequest("Invalid JSON data for Cart")
    }
  }

  // DELETE /carts/:id
  def delete(id: Long): Action[AnyContent] = Action {
    cartList.indexWhere(_.id == id) match {
      case -1 => NotFound(s"Cart with id=$id not found")
      case idx =>
        cartList.remove(idx)
        Ok(s"Cart with id=$id deleted")
    }
  }
}
