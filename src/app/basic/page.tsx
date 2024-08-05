"use client";
import { Controller, useForm, SubmitHandler } from "react-hook-form";

enum Gender {
  empty = "",
  female = "female",
  male = "male",
  other = "other",
}

enum NewsLatter {
  receive = "receive",
  reject = "reject",
}

type Inputs = {
  fullName: string;
  gender: Gender;
  comment?: string;
  newsLatter: NewsLatter;
  agree: boolean;
};

export default function Page() {
  // 初期値
  const defaultValues = {
    fullName: "",
    gender: Gender.empty,
    comment: "",
    newsLatter: NewsLatter.receive,
    agree: false,
  };

  // react hook from のセットアップ
  const { control, handleSubmit, reset } = useForm<Inputs>({
    defaultValues,
  });

  // フォーム送信処理
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  // フォームリセット処理
  const handleReset = () => {
    reset();
  };

  return (
    <div>
      <p className="breadcrumb">[ basic ]</p>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <Controller
          name="fullName"
          rules={{ required: "名前が入力されてないようです。" }}
          control={control}
          render={({ field, fieldState }) => (
            <div
              className={`form-group ${!!fieldState.error ? `is-error` : ``}`}
            >
              <label htmlFor="fullName">名前</label>
              <div>
                <input id="fullName" {...field} />
                {fieldState.error && (
                  <span className="error-message">
                    {fieldState.error.message}
                  </span>
                )}
              </div>
            </div>
          )}
        />
        <Controller
          name="gender"
          rules={{ required: "性別が選択されてないようです。" }}
          control={control}
          render={({ field, fieldState }) => (
            <div
              className={`form-group ${!!fieldState.error ? `is-error` : ``}`}
            >
              <label htmlFor="gender">性別</label>
              <div>
                <select id="gender" {...field}>
                  <option value={Gender.empty}></option>
                  <option value={Gender.female}>女性</option>
                  <option value={Gender.male}>男性</option>
                  <option value={Gender.other}>無回答</option>
                </select>
                {fieldState.error && (
                  <span className="error-message">
                    {fieldState.error.message}
                  </span>
                )}
              </div>
            </div>
          )}
        />
        <Controller
          name="comment"
          rules={{
            minLength: { value: 3, message: "3文字以上で入力してください" },
            maxLength: { value: 10, message: "10文字以下で入力してください" },
          }}
          control={control}
          render={({ field, fieldState }) => (
            <div
              className={`form-group ${!!fieldState.error ? `is-error` : ``}`}
            >
              <label htmlFor="comment">コメント</label>
              <div>
                <textarea id="comment" {...field} />
                {fieldState.error && (
                  <span className="error-message">
                    {fieldState.error.message}
                  </span>
                )}
              </div>{" "}
            </div>
          )}
        />
        <Controller
          name="newsLatter"
          rules={{
            required: "お知らせの受け取りについて選択してください",
          }}
          control={control}
          render={({ field, fieldState }) => (
            <div
              className={`form-group ${!!fieldState.error ? `is-error` : ``}`}
            >
              <label htmlFor="newsLatter">お知らせ</label>
              <div className="form-group">
                <label>
                  <input
                    type="radio"
                    {...field}
                    value={NewsLatter.receive}
                    checked={field.value === NewsLatter.receive}
                  />
                  受け取る
                </label>
                <label>
                  <input
                    type="radio"
                    {...field}
                    value={NewsLatter.reject}
                    checked={field.value === NewsLatter.reject}
                  />
                  受け取らない
                </label>
              </div>
            </div>
          )}
        />{" "}
        <Controller
          name="agree"
          rules={{ required: "チェックボックスをチェックしてください" }}
          control={control}
          render={({ field: { value, ...rest }, fieldState }) => (
            <div
              className={`form-group ${!!fieldState.error ? `is-error` : ``}`}
            >
              <div>
                <label>
                  <input type="checkbox" checked={value} {...rest} />{" "}
                  <span>利用規約に同意する</span>
                </label>
                {fieldState.error && (
                  <span className="error-message">
                    {fieldState.error.message}
                  </span>
                )}
              </div>
            </div>
          )}
        />
        <div className="button-group">
          <button type="submit">送信</button>
          <button type="button" onClick={handleReset}>
            リセット
          </button>
        </div>
      </form>
    </div>
  );
}
