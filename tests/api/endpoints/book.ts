import { deleteJson, deleteJsonWithBody, getJson, postJson, putJson } from '../../utils/requestHelpers';
import { API_PATHS } from '../../utils/constants';

export async function getBooks(request) {
    return getJson(request, API_PATHS.books);
}

export async function getBook(request,isbn) {
    return getJson(request, API_PATHS.book, {params: { ISBN: isbn }});
}

export async function addBooks(request,data,token) {
    return postJson(request, API_PATHS.books, data,{ headers: { Authorization: `Bearer ${token}`}});
} 

export async function clearBooks(request,userId,token) {
    return deleteJson(request, API_PATHS.books, {params: { UserId: userId },headers: { Authorization: `Bearer ${token}`}});
}

export async function deleteBook(request,data,token) {
    return deleteJsonWithBody(request, API_PATHS.books, data, {headers: { Authorization: `Bearer ${token}`}});
}

export async function putBook(request, isbn, data,token) {
    return putJson(request, API_PATHS.putbook(isbn), data, {headers: { Authorization: `Bearer ${token}`}});
}