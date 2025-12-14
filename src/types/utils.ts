// types/utils.ts
/**
 * 工具类型和通用类型定义
 *
 * 提供 TypeScript 高级类型工具和通用的数据结构定义
 * 这些类型可以在整个项目中复用，提高代码的类型安全性和开发效率
 */

// ==================== 类型操作工具 ====================

/**
 * 可选属性类型
 * @description 将指定属性变为可选，其他属性保持不变
 * @example
 * type User = { id: number; name: string; email: string };
 * type PartialUser = Optional<User, 'email'>; // { id: number; name: string; email?: string }
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * 可为空类型
 * @description 表示一个值可以是具体类型或 null
 * @example
 * type Name = Nullable<string>; // string | null
 */
export type Nullable<T> = T | null;

/**
 * 可未定义类型
 * @description 表示一个值可以是具体类型或 undefined
 * @example
 * type Config = Maybe<AppConfig>; // AppConfig | undefined
 */
export type Maybe<T> = T | undefined;

/**
 * 深度只读类型
 * @description 递归地将对象的所有属性设置为只读
 * @example
 * type ReadonlyConfig = DeepReadonly<AppConfig>; // 所有层级都是 readonly
 */
export type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/**
 * 深度可选类型
 * @description 递归地将对象的所有属性设置为可选
 * @example
 * type PartialConfig = DeepPartial<AppConfig>; // 所有层级都是可选的
 */
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * 深度必需类型
 * @description 递归地将对象的所有属性设置为必需
 * @example
 * type RequiredConfig = DeepRequired<Partial<AppConfig>>; // 所有层级都是必需的
 */
export type DeepRequired<T> = {
    [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

/**
 * 值类型提取
 * @description 从对象类型中提取所有值的联合类型
 * @example
 * type Colors = { primary: 'red'; secondary: 'blue' };
 * type ColorValues = ValueOf<Colors>; // 'red' | 'blue'
 */
export type ValueOf<T> = T[keyof T];

/**
 * 异步返回值类型
 * @description 提取 Promise 的解析值类型
 * @example
 * type ApiResponse = Awaited<Promise<{ data: User }>>; // { data: User }
 */
export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

// ==================== 函数相关类型 ====================

/**
 * 通用函数类型
 * @description 表示任意参数的函数
 * @example
 * const handler: FunctionType = (a, b) => a + b;
 */
export type FunctionType = (...args: unknown[]) => unknown;

/**
 * 构造函数类型
 * @description 表示类的构造函数
 * @example
 * class User { constructor(public name: string) {} }
 * type UserConstructor = ConstructorType<User>; // new (name: string) => User
 */
export type ConstructorType<T = unknown> = new (...args: unknown[]) => T;

/**
 * 函数参数类型
 * @description 提取函数的参数类型元组
 * @example
 * type Fn = (a: string, b: number) => boolean;
 * type Params = Parameters<Fn>; // [string, number]
 */
export type Parameters<T extends FunctionType> = T extends (...args: infer P) => unknown ? P : never;

/**
 * 函数返回类型
 * @description 提取函数的返回值类型
 * @example
 * type Fn = () => Promise<User>;
 * type Return = ReturnType<Fn>; // Promise<User>
 */
export type ReturnType<T extends FunctionType> = T extends (...args: unknown[]) => infer R ? R : unknown;

/**
 * 事件处理器类型
 * @description 通用的事件处理函数类型
 * @example
 * const clickHandler: EventHandler<MouseEvent> = (event) => console.log(event.clientX);
 */
export type EventHandler<T = Event> = (event: T) => void;

// ==================== 异步和结果类型 ====================

/**
 * 异步操作结果
 * @description 表示异步操作的成功或失败结果
 * @example
 * async function fetchUser(): AsyncResult<User> {
 *   try {
 *     const user = await api.getUser();
 *     return { success: true, data: user };
 *   } catch (error) {
 *     return { success: false, error };
 *   }
 * }
 */
export type AsyncResult<T, E = Error> =
    | { success: true; data: T }
    | { success: false; error: E };

/**
 * 加载状态
 * @description 表示数据的加载状态
 * @example
 * type UserState = Loadable<User>;
 * const state: UserState = { loading: true, data: null, error: null };
 */
export type Loadable<T> =
    | { loading: true; data: null; error: null }
    | { loading: false; data: T; error: null }
    | { loading: false; data: null; error: Error };

// ==================== 数据结构和配置 ====================

/**
 * 分页参数
 * @description 分页查询的通用参数
 * @example
 * const params: PaginationParams = {
 *   page: 1,
 *   pageSize: 20,
 *   sortBy: 'name',
 *   sortOrder: 'asc'
 * };
 */
export interface PaginationParams {
    page: number;                   // 当前页码（从1开始）
    pageSize: number;               // 每页数据量
    sortBy?: string;                // 排序字段
    sortOrder?: 'asc' | 'desc';     // 排序方向
}

/**
 * 时间范围
 * @description 表示一个时间区间
 * @example
 * const range: TimeRange = { start: Date.now() - 3600000, end: Date.now() };
 */
export interface TimeRange {
    start: number;                  // 开始时间戳（毫秒）
    end: number;                    // 结束时间戳（毫秒）
}

/**
 * 二维坐标位置
 * @description 表示在二维空间中的位置
 * @example
 * const position: Position = { x: 100, y: 200 };
 */
export interface Position {
    x: number;                      // X 坐标
    y: number;                      // Y 坐标
}

/**
 * 尺寸信息
 * @description 表示宽度和高度的尺寸
 * @example
 * const size: Size = { width: 1920, height: 1080 };
 */
export interface Size {
    width: number;                  // 宽度
    height: number;                 // 高度
}

/**
 * 矩形区域
 * @description 由位置和尺寸定义的矩形区域
 * @example
 * const rect: Rectangle = { x: 0, y: 0, width: 100, height: 100 };
 */
export interface Rectangle extends Position, Size {}

/**
 * RGB 颜色值
 * @description 表示 RGB 颜色，可选透明度
 * @example
 * const red: Color = { r: 255, g: 0, b: 0, a: 1 };
 */
export interface Color {
    r: number;                      // 红色分量 0-255
    g: number;                      // 绿色分量 0-255
    b: number;                      // 蓝色分量 0-255
    a?: number;                     // 透明度 0-1（可选）
}

// ==================== 集合和映射类型 ====================

/**
 * 键值对对象
 * @description 通用的字符串键对象类型
 * @example
 * const config: KeyValue<string> = { theme: 'dark', language: 'zh-CN' };
 */
export interface KeyValue<T = unknown> {
    [key: string]: T;
}

/**
 * 枚举映射类型
 * @description 为枚举的每个值定义对应的类型
 * @example
 * type Status = 'pending' | 'success' | 'error';
 * type StatusConfig = EnumMap<Status, { color: string; icon: string }>;
 */
export type EnumMap<T extends string | number, U> = {
    [K in T]: U;
};

/**
 * 数组元素类型
 * @description 提取数组的元素类型
 * @example
 * type Users = Array<{ id: number; name: string }>;
 * type User = ArrayElement<Users>; // { id: number; name: string }
 */
export type ArrayElement<T> = T extends (infer U)[] ? U : never;

// ==================== 回调函数类型 ====================

/**
 * 通用回调函数
 * @description 接受一个结果参数的回调函数
 * @example
 * function fetchData(callback: Callback<string>) {
 *   callback('data');
 * }
 */
export type Callback<T = void> = (result: T) => void;

/**
 * 进度回调函数
 * @description 用于报告进度的回调函数
 * @example
 * function downloadFile(onProgress: ProgressCallback) {
 *   onProgress(50, 100); // 50% 进度
 * }
 */
export type ProgressCallback = (progress: number, total: number) => void;

/**
 * 错误优先回调
 * @description Node.js 风格的回调函数（错误优先）
 * @example
 * function readFile(callback: ErrorFirstCallback<string>) {
 *   callback(null, 'file content');
 * }
 */
export type ErrorFirstCallback<T = void> = (error: Error | null, result?: T) => void;

/**
 * 清理函数类型
 * @description 用于资源清理和卸载的函数
 * @example
 * function createTimer(): DisposeFunction {
 *   const timer = setInterval(() => {}, 1000);
 *   return () => clearInterval(timer);
 * }
 */
export type DisposeFunction = () => void;

// ==================== 常量定义 ====================

/**
 * 空对象类型
 * @description 表示一个空对象，用于泛型约束
 */
export type EmptyObject = Record<string, never>;

/**
 * 任意对象类型
 * @description 表示任意结构的对象
 */
export type unknownObject = Record<string, unknown>;

/**
 * 无参函数类型
 * @description 不接受任何参数的函数
 */
export type NoParamFunction<T = void> = () => T;

/**
 * 比较函数类型
 * @description 用于排序和比较的函数
 * @example
 * const numberCompare: CompareFunction<number> = (a, b) => a - b;
 */
export type CompareFunction<T = unknown> = (a: T, b: T) => number;

// ==================== 条件类型工具 ====================

/**
 * 类型谓词
 * @description 用于类型保护的函数类型
 * @example
 * function isString(value: unknown): value is string {
 *   return typeof value === 'string';
 * }
 */
export type TypePredicate<T> = (value: unknown) => value is T;

/**
 * 品牌类型
 * @description 为基本类型添加品牌标识，避免原始类型混淆
 * @example
 * type UserId = Brand<string, 'UserId'>;
 * type ProductId = Brand<string, 'ProductId'>;
 * // UserId 和 ProductId 在类型上是不同的，尽管底层都是 string
 */
export type Brand<T, B extends string> = T & { __brand: B };

/**
 * 非空类型
 * @description 排除 null 和 undefined 的类型
 * @example
 * type Name = NonNullable<string | null | undefined>; // string
 */
export type NonNullable<T> = T extends null | undefined ? never : T;