"use client";
import { useEffect } from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  Button,
  Typography,
  Box,
  Container,
  CircularProgress,
  Stack,
  Alert,
} from "@mui/material";

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
  const defaultValues = {
    fullName: "",
    gender: Gender.empty,
    comment: "",
    newsLatter: NewsLatter.receive,
    agree: false,
  };

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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    clearErrors("root");
    try {
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          const isSuccess = Math.random() < 0.5;
          if (isSuccess) {
            console.log("送信成功:", data);
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

  const handleReset = () => {
    reset();
  };

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
    <Container>
      <Typography variant="body2" sx={{ textAlign: "right", mb: 4 }}>
        [ MUI ]
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 1 }}
      >
        {isSubmitting && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              my: 2,
            }}
          >
            <CircularProgress size={40} sx={{ mr: 2 }} />
            <Typography variant="body1">送信中...</Typography>
          </Box>
        )}
        {!isSubmitting && isSubmitted && (
          <Alert
            severity={isSubmitSuccessful ? "success" : "error"}
            sx={{ alignItems: "center" }}
          >
            {isSubmitSuccessful ? "送信成功" : "送信失敗"}
            {errors.root?.serverError && (
              <Button onClick={() => handleSubmit(onSubmit)()}>リトライ</Button>
            )}
          </Alert>
        )}
        <Controller
          name="fullName"
          control={control}
          rules={{ required: "名前が入力されてないようです。" }}
          render={({ field, fieldState: { error } }) => (
            <Box>
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                id="fullName"
                label="名前"
                error={!!error}
                helperText={error?.message}
              />
            </Box>
          )}
        />
        <Controller
          name="gender"
          control={control}
          rules={{ required: "性別が選択されてないようです。" }}
          render={({ field, fieldState: { error } }) => (
            <Box>
              <FormControl fullWidth margin="normal" error={!!error}>
                <InputLabel id="gender-label">性別</InputLabel>
                <Select
                  {...field}
                  labelId="gender-label"
                  id="gender"
                  label="性別"
                >
                  <MenuItem value={Gender.empty}>
                    <em>選択してください</em>
                  </MenuItem>
                  <MenuItem value={Gender.female}>女性</MenuItem>
                  <MenuItem value={Gender.male}>男性</MenuItem>
                  <MenuItem value={Gender.other}>無回答</MenuItem>
                </Select>
                {error && (
                  <Typography color="error">{error.message}</Typography>
                )}
              </FormControl>
            </Box>
          )}
        />
        <Controller
          name="comment"
          control={control}
          rules={{
            minLength: { value: 3, message: "3文字以上で入力してください" },
            maxLength: { value: 10, message: "10文字以下で入力してください" },
          }}
          render={({ field, fieldState: { error } }) => (
            <Box>
              <TextField
                {...field}
                margin="normal"
                fullWidth
                id="comment"
                label="コメント"
                multiline
                rows={4}
                error={!!error}
                helperText={error?.message}
              />
            </Box>
          )}
        />
        <Controller
          name="newsLatter"
          control={control}
          rules={{ required: "お知らせの受け取りについて選択してください" }}
          render={({ field, fieldState: { error } }) => (
            <Box>
              <FormControl component="fieldset" margin="normal" error={!!error}>
                <Typography component="legend">お知らせ</Typography>
                <RadioGroup {...field} row>
                  <FormControlLabel
                    value={NewsLatter.receive}
                    control={<Radio />}
                    label="受け取る"
                  />
                  <FormControlLabel
                    value={NewsLatter.reject}
                    control={<Radio />}
                    label="受け取らない"
                  />
                </RadioGroup>
                {error && (
                  <Typography color="error">{error.message}</Typography>
                )}
              </FormControl>
            </Box>
          )}
        />
        <Controller
          name="agree"
          control={control}
          rules={{ required: "チェックボックスをチェックしてください" }}
          render={({ field, fieldState: { error } }) => (
            <FormControlLabel
              control={
                <Checkbox {...field} checked={field.value} color="primary" />
              }
              label="利用規約に同意する"
            />
          )}
        />
        {errors.agree && (
          <Typography color="error">{errors.agree.message}</Typography>
        )}
        <Box sx={{ mt: 10, display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isDirty || !isValid}
            sx={{ mr: 2 }}
          >
            送信
          </Button>
          <Button type="button" variant="outlined" onClick={handleReset}>
            リセット
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
