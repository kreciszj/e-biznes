package controllers

import javax.inject._
import play.api.mvc._
import scala.collection.mutable
import play.api.libs.json.{Json, OFormat}

// Categories model
case class Category(id: Long, name: String)

// JSON Format
object Category {
  implicit val format: OFormat[Category] = Json.format[Category]
}

@Singleton
class CategoryController @Inject() (cc: ControllerComponents) extends AbstractController(cc) {

  // Example data
  private val categoryList: mutable.ListBuffer[Category] = mutable.ListBuffer(
    Category(1, "Electronics"),
    Category(2, "Gaming"),
    Category(3, "Sport")
  )

  // GET /categories
  def getAll(): Action[AnyContent] = Action {
    Ok(Json.toJson(categoryList))
  }

  // GET /categories/:id
  def getById(id: Long): Action[AnyContent] = Action {
    val categoryOpt = categoryList.find(_.id == id)
    categoryOpt match {
      case Some(cat) => Ok(Json.toJson(cat))
      case None      => NotFound(s"Category with id=$id not found")
    }
  }

  // POST /categories
  def create(): Action[AnyContent] = Action { request =>
    val jsonBody = request.body.asJson
    jsonBody match {
      case Some(json) =>
        val newCategory = json.as[Category]
        val maxId = if (categoryList.isEmpty) 0 else categoryList.map(_.id).max
        val categoryToAdd = newCategory.copy(id = maxId + 1)
        categoryList += categoryToAdd
        Created(Json.toJson(categoryToAdd))
      case None =>
        BadRequest("Invalid JSON data for Category")
    }
  }

  // PUT /categories/:id
  def update(id: Long): Action[AnyContent] = Action { request =>
    val jsonBody = request.body.asJson
    jsonBody match {
      case Some(json) =>
        val updatedCategory = json.as[Category]
        categoryList.indexWhere(_.id == id) match {
          case -1 => NotFound(s"Category with id=$id not found")
          case idx =>
            categoryList.update(idx, updatedCategory.copy(id = id))
            Ok(Json.toJson(categoryList(idx)))
        }
      case None =>
        BadRequest("Invalid JSON data for Category")
    }
  }

  // DELETE /categories/:id
  def delete(id: Long): Action[AnyContent] = Action {
    categoryList.indexWhere(_.id == id) match {
      case -1 => NotFound(s"Category with id=$id not found")
      case idx =>
        categoryList.remove(idx)
        Ok(s"Category with id=$id deleted")
    }
  }
}
