import { put, takeLatest, all, call } from 'redux-saga/effects';
import { fetchAllDataSuccess, fetchAllDataFailure } from './action';
import * as types from "./types";
import { getAllDataApi} from './api';

function* fetchItemsSaga() {
    try {
        const response = yield call(getAllDataApi);
        yield put(fetchAllDataSuccess(response.data));
    } catch (error) {
        yield put(fetchAllDataFailure(error));
    }
}

// function* fetchItemsSagaDelete(action) {

//     try {
//         const response = yield call(fetchApiDelete,action.payload); 
//         yield put(fetchItemsSuccessDelete(response.data));
//     } catch (error) {
//         yield put(fetchItemsFailureDelete(error));
//     }
// }

// function* fetchItemsSagaPost(action) {

//     try {
//         const response = yield call(fetchApiPost,action.payload); 
//         yield put(fetchItemsSuccessPost(response.data));
//     } catch (error) {
//         yield put(fetchItemsFailurePost(error));
//     }
// }

// function* updateItemSaga(action) {
//     try {
//       yield call(updateItemApi, action.payload.itemId, action.payload.updatedData);
//       yield put(updateItemSuccess());
//     } catch (error) {
//       yield put(updateItemFailure(error));
//     }
//   }
  

function* watchFetchItems() {
    yield takeLatest(types.FETCH_ALL_DATA, fetchItemsSaga);
}

export default function* rootSaga() {
    yield all([watchFetchItems()]);
}
