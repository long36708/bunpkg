/**
 * 防抖函数 - 返回一个函数，该函数在停止调用 n 毫秒后执行
 * @param func 要防抖的函数
 * @param wait 等待时间（毫秒）
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  let timeoutId: any = null;
  const pendingMap = new Map<string, Promise<ReturnType<T>>>();
  let lastRequestId = 0;
  const requestMap = new Map<number, { args: Parameters<T>, resolve: (value: ReturnType<T>) => void, reject: (reason: any) => void }>();

  return function (...args: Parameters<T>): Promise<ReturnType<T>> {
    const key = JSON.stringify(args);
    const requestId = ++lastRequestId;
    
    // 如果已经有相同参数的待处理请求，直接返回该Promise
    if (pendingMap.has(key)) {
      return pendingMap.get(key)!;
    }
    
    // 清除之前的定时器
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    // 创建新的Promise
    const taskPromise = new Promise<ReturnType<T>>((resolve, reject) => {
      // 存储请求信息，用于解决竞态问题
      requestMap.set(requestId, { args, resolve, reject });
      
      timeoutId = setTimeout(() => {
        timeoutId = null;
        
        // 执行原函数
        Promise.resolve(func.apply(this, args))
          .then(result => {
            // 检查是否是最新的请求
            if (requestMap.has(requestId)) {
              pendingMap.delete(key);
              resolve(result);
              requestMap.delete(requestId);
            }
          })
          .catch(error => {
            // 检查是否是最新的请求
            if (requestMap.has(requestId)) {
              pendingMap.delete(key);
              reject(error);
              requestMap.delete(requestId);
            }
          });
      }, wait);
    });
    
    pendingMap.set(key, taskPromise);
    return taskPromise;
  };
}

/**
 * 带缓存的防抖函数 - 防抖的同时缓存结果
 * @param func 要防抖的函数
 * @param wait 等待时间（毫秒）
 * @param maxAge 缓存最大存活时间（毫秒）
 * @returns 防抖后的函数
 */
export function debounceWithCache<T extends (...args: any[]) => Promise<any>>(
  func: T,
  wait: number,
  maxAge: number = 5 * 60 * 1000 // 默认5分钟
): (...args: Parameters<T>) => ReturnType<T> {
  const cache = new Map<string, { value: ReturnType<T>, timestamp: number }>();
  const debouncedFunc = debounce(func, wait);

  return async function (...args: Parameters<T>): Promise<ReturnType<T>> {
    const key = JSON.stringify(args);
    const now = Date.now();
    
    // 检查缓存
    const cached = cache.get(key);
    if (cached && (now - cached.timestamp < maxAge)) {
      return cached.value;
    }
    
    // 使用防抖函数执行
    const result = debouncedFunc.apply(this, args);
    
    // 存储到缓存
    cache.set(key, { value: result, timestamp: now });
    
    // 清理过期缓存项
    cache.forEach((cachedItem, cacheKey) => {
      if (now - cachedItem.timestamp >= maxAge) {
        cache.delete(cacheKey);
      }
    });
    
    return result;
  };
}