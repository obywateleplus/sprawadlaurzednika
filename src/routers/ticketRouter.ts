import express, { Request, Response, Router } from "express";
import { database } from "../vars";
import { respondNotFound } from "../responseParser";
import { request } from "http";
import { send } from "process";

export const ticketRouter: Router = express.Router();

ticketRouter
  .route("/ticket")
  .get(async (req: Request, res: Response) => {
    const data = new URLSearchParams(
      req.url.substring(req.url.indexOf("?"), req.url.length)
    );
    const pool = database?.promise();
    var command = "";
    var search: string | null = "";
    if (data.get("id") == null) {
      if (data.get("user") == null) {
        res.send({ code: 400, message: "No id or user parameters specified." });
      } else {
        search = data.get("user");
        if (data.get("type") == null) {
          command =
            "SELECT `obywateleplus`.`zgloszenia`.* FROM `obywateleplus`.`zgloszenia` LEFT JOIN `obywateleplus`.`uzytkownik` ON `obywateleplus`.`zgloszenia`.`uzytkownik_id` = `obywateleplus`.`uzytkownik`.`id` WHERE `obywateleplus`.`uzytkownik`.`id` = ?;";
        } else {
          if (data.get("type") == "user") {
            command =
            "SELECT `obywateleplus`.`zgloszenia`.* FROM `obywateleplus`.`zgloszenia` LEFT JOIN `obywateleplus`.`uzytkownik` ON `obywateleplus`.`zgloszenia`.`uzytkownik_id` = `obywateleplus`.`uzytkownik`.`id` WHERE `obywateleplus`.`uzytkownik`.`id` = ?;";
          } else {
            command =
              "SELECT `obywateleplus`.`zgloszenia`.* FROM `obywateleplus`.`zgloszenia` LEFT JOIN `obywateleplus`.`wykonawca` ON `obywateleplus`.`zgloszenia`.`wykonawca_id` = `obywateleplus`.`wykonawca`.`id` WHERE `obywateleplus`.`wykonawca`.`id` = ?;";
          }
        }
      }
    } else {
      search = data.get("id");
      command =
        "SELECT * FROM `obywateleplus`.`zgloszenia` WHERE `obywateleplus`.`zgloszenia`.`id` = ?;";
    }
    const ticket: any = await pool?.execute(command, [search]);
    if (ticket[0][0] === undefined) {
      respondNotFound(res, `Cannot find ticket with id ${data.get("id")}`);
    } else {
      res.send(ticket[0]);
    }
  })
  .post(async (req: Request, res: Response) => {
    const data = req.body;
    if (data.creator == undefined || data.type == undefined || data.title == undefined) {
      res.send("Invalid data provided");
    } else {
      const pool = database?.promise();
      const creator = data.creator.split(" ");
      const user: any = await pool?.execute(
        "SELECT obywateleplus.uzytkownikserwis.id FROM obywateleplus.uzytkownikserwis JOIN obywateleplus.uzytkownik ON obywateleplus.uzytkownikserwis.uzytkownik_id = obywateleplus.uzytkownik.id WHERE obywateleplus.uzytkownik.imie = ? AND obywateleplus.uzytkownik.nazwisko = ?;",
        [creator[0], creator[1]]
      );
      const result: any = await pool?.execute(
        "INSERT INTO `obywateleplus`.`zgloszenia` (title, uzytkownik_id, wykonawca_id, typzgloszenia_typ, open) VALUES (?, ?, 1, ?, 1);",
        [data.title, user[0][0].id, data.type]
      );
      res.send(result);
    }
  })
  .patch(async (req: Request, res: Response) => {
    const data = new URLSearchParams(
      req.url.substring(req.url.indexOf("?"), req.url.length)
    );
    const pool = database?.promise();
    const result: any = await pool?.execute(
      "UPDATE `obywateleplus`.`zgloszenia` SET `obywateleplus`.`zgloszenia`.`open` = ? WHERE `obywateleplus`.`zgloszenia`.`id` = ?;",
      [data.get("open"), data.get("id")]
    );
    res.send(result[0]);
  });