import { Request, Response } from "express";
import Tasks from "../models/Task";

export  class TaskController{

    public static async index(req: Request, res: any,){
        try {
            let tasklist=await Tasks.findAll();
            return res.successResponse({data:tasklist},"Task list successfully");
        } catch (error) {
            throw error;
        }
    }

    public static async addTask(req: Request, res: any,){
        let request = req.body;
        try {
            let task=await Tasks.create({
                title:request.title,
                description:request.description,
                status:request.status
            });
            return res.successResponse({data:task},"Task created successfully");
        } catch (error) {
            throw error;
        }
        
    }

    public static async update(req: Request, res: any,){
        let request = req.body;
        try {
            let task=await Tasks.update({
                title:request.title,
                description:request.description,
                status:request.status
            },{where:{id:req.params.task_id}});
            return res.successResponse({data:task},"task update successfully");
        } catch (error) {
            throw error;
        }
    }

    public static async deleteTask(req: Request, res: any,){
        let request = req.body;
        try {
            let task=await Tasks.destroy({where:{id:req.params.task_id}});
            return res.successResponse({},"task delete successfully");
        } catch (error) {
            throw error;
        }
    }

}