import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";

const BACKEND_URL = environment.backendUrl + "/topics/";

@Injectable({
  providedIn: "root",
})
export class TopicService {
  constructor(private http: HttpClient) {}

  newTopic(name: string, description: string, categoryId: string, image: File) {
    const topicData = new FormData();
    topicData.append("name", name);
    topicData.append("description", description);
    topicData.append("categoryId", categoryId);
    topicData.append("image", image, name);
    return this.http.post<{ msg: string, success: boolean }>(BACKEND_URL + "create", topicData);
  }

  getAllTopics() {
    // const queryParams = `?pagesize=${TopicsPerPage}&page=${currentPage}`;
    return this.http.get<{ response: any }>(BACKEND_URL + "get-all");
  }
  
  getAdminTopics(TopicsPerPage, currentPage) {
    const queryParams = `?pageSize=${TopicsPerPage}&page=${currentPage}`;
    return this.http.get<{ response: any }>(BACKEND_URL + "admin-topics" + queryParams);
  }

  findOneTopic(id: string) {
    return this.http.get<{ response: any }>(BACKEND_URL + id);
  }

  getUserTopics() {
    return this.http.get<{ success: boolean, msg: string, topics: any[] }>(BACKEND_URL + "all-topics");
  }

  updateTopic(
    id: string,
    name: string,
    description: string,
    categoryId: string,
    image: File
  ) {
    let topicData: FormData | any;
    if (typeof image === "object") {
      topicData = new FormData();
      topicData.append("name", name);
      topicData.append("description", description);
      topicData.append("categoryId", categoryId);
      topicData.append("image", image, name);
    } else {
      topicData = {
        _id: id,
        name,
        description,
        categoryId,
        image,
      };
    }
    return this.http.put<{ msg: string, success: boolean }>(BACKEND_URL + id, topicData);
  }

  deleteTopic(id: string) {
    return this.http.delete<{ msg: string, success: boolean }>(BACKEND_URL + id);
  }
}
