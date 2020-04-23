import { EntityRepository, Repository } from "typeorm";
import { Workshop } from "./workshop.entity";

@EntityRepository(Workshop)
export class WorkshopRepository extends Repository<Workshop> {}