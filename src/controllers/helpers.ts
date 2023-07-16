/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpResponse, HttpStatusCode } from "./protocols";

export const created = <T>(body: any): HttpResponse<T> => ({ statusCode: HttpStatusCode.CREATED, body });

export const goodRequest = <T>(body: any): HttpResponse<T> => ({ statusCode: HttpStatusCode.GOOD_REQUEST, body });

export const badRequest = (message: string): HttpResponse<string> => ({ statusCode: HttpStatusCode.BAD_REQUEST, body: message });

export const serverError = (): HttpResponse<string> => ({statusCode: HttpStatusCode.SERVER_ERROR, body: 'Something went wrong'});