import request from './request';

interface ApiResponse {
  data: any;
  status: number;
}

class BaseApiServer {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  post(data: any): Promise<ApiResponse> {
    return request({
      method: 'post',
      url: this.endpoint,
      data
    });
  }

  async get(): Promise<any> {
    try {
      const response: ApiResponse = await request.get(this.endpoint);
      return response.data;
    } catch (error) {
      console.error('API请求失败:', error);
      throw error;
    }
  }
}

export default BaseApiServer; 