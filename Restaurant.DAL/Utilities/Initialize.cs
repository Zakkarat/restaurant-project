using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml;
using Restaurant.DAL.Entities;

namespace Restaurant.DAL.Utilities
{
    public class Initialize
    {
        public static void Init(RestaurantContext context)
        {
            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.Load("restaurantDB.xml");
            
            List<string> ingredients = new List<string>();

            foreach (XmlNode node in xmlDoc.DocumentElement)
            {
                for (int i = 0; i < node["Ingredients"].ChildNodes.Count; i++)
                {
                    ingredients.Add(node["Ingredients"].ChildNodes[i].InnerText);    
                }
            }
            ingredients = ingredients.Distinct().OrderBy(elem=>elem).ToList();

            foreach(var ingredient in ingredients)
            {
                context.Ingredients.Add(
                    new Ingredient
                    {
                        Name = ingredient
                    });
                context.SaveChanges();
            }

            foreach (XmlNode node in xmlDoc.DocumentElement)
            {
                List<Ingredient> innerIngredients = new List<Ingredient>();
                for (int i = 0; i < node["Ingredients"].ChildNodes.Count; i++)
                {
                    string name = node["Ingredients"].ChildNodes[i].InnerText;
                    
                    innerIngredients.Add(context.Ingredients.Single(elem => elem.Name == name));
                }
                
                context.Dishes.Add(new Dish
                    {
                        Name = node["Name"].InnerText,
                        Price = int.Parse(node["Price"].InnerText),
                        CookingTime = int.Parse(node["CookingTime"].InnerText),
                        Ingredients = innerIngredients
                    }
                );
                context.SaveChanges();
            }

            for (int i = 1; i <=25 ; i++)
            {
                context.Tables.Add(
                    new Table
                    {
                        Number = i
                    });
                context.SaveChanges();
            }
            
            Random random = new Random();
            for (int i = 1; i <= 7; i++)
            {
                List<Dish> orderedDishes = new List<Dish>();

                for (int j = 0; j <= random.Next(1, 7); j++)
                {
                    int randomId = random.Next(1, 100);
                    orderedDishes.Add(context.Dishes.Single(elem => elem.Id == randomId));
                }
                
                context.Orders.Add(
                    new Order
                    {
                        TableId = random.Next(1, 25),
                        Dishes = orderedDishes
                    });
                context.SaveChanges();
            }
        }
    }
}