export default function callPromise(promiseCreator) {
    // 로딩중 / 완료 / 실패에 대한 상태 관리
    let loading = null;
    let resolved = null;
    let error = null;

      const process = async () => {
        loading = true;
        try {
          const result = await promiseCreator();
          resolved = result;
        } catch (e) {
          error = e;
        }
        loading = false;
      };
      process();
  
    return [loading, resolved, error];
  }