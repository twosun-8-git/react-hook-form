"use client";
import { useEffect } from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";

const Gender = {
  empty: "",
  female: "female",
  male: "male",
  other: "other",
} as const;

const NewsLatter = {
  receive: "receive",
  reject: "reject",
} as const;

type Gender = (typeof Gender)[keyof typeof Gender];
type NewsLatter = (typeof NewsLatter)[keyof typeof NewsLatter];
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

  // react hook from の初期設定
  const {
    control,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: {
      isDirty,
      isValid,
      isSubmitting,
      isSubmitted,
      isSubmitSuccessful,
      errors,
    },
  } = useForm<Inputs>({
    defaultValues,
    mode: "all",
  });

  // フォーム送信処理
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    clearErrors("root");
    try {
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          const isSuccess = Math.random() < 0.5;
          if (isSuccess) {
            console.log("送信成功:", data);
            // reset(); 本来ならフォーム送信成功後はフォームをリセット
            resolve();
          } else {
            console.log("送信失敗");
            reject(new Error("送信に失敗しました"));
          }
        }, 1500);
      });
    } catch (error) {
      console.error("エラー:", error);
      setError("root.serverError", {
        type: "manual",
        message: "送信に失敗しました。もう一度お試しください。",
      });
    }
  };

  // フォームリセット処理
  const handleReset = () => {
    reset();
  };

  // フォーム保存前離脱のアラート
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  // コンソールに表示
  useEffect(() => {
    console.table([
      {
        状態: "フォーム状態",
        isDirty,
        isValid,
        isSubmitting,
        isSubmitted,
        isSubmitSuccessful,
      },
    ]);

    console.table(
      Object.entries(errors).map(([key, value]) => ({
        フィールド: key,
        エラーメッセージ:
          value && typeof value === "object" && "message" in value
            ? value.message
            : JSON.stringify(value),
      }))
    );
  }, [errors, isDirty, isSubmitSuccessful, isSubmitted, isSubmitting, isValid]);

  return (
    <div>
      <p className="breadcrumb">[ custom ]</p>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        {isSubmitting && <div className="result">送信中</div>}
        {!isSubmitting && isSubmitted && (
          <div
            className={`result ${
              isSubmitSuccessful ? `is-success` : `is-failed`
            }`}
          >
            {isSubmitSuccessful ? "送信成功" : "送信失敗"}
            {errors.root?.serverError && (
              <button onClick={() => handleSubmit(onSubmit)}>リトライ</button>
            )}
          </div>
        )}
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
                <input id="fullName" type="text" {...field} />
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
              </div>
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
        />
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
                  <input type="checkbox" checked={value} {...rest} />
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
          <button type="submit" disabled={!isDirty || !isValid}>
            送信
          </button>
          <button type="button" onClick={handleReset}>
            リセット
          </button>
        </div>
      </form>
    </div>
  );
}
