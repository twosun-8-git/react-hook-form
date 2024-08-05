import Link from "next/link";

export default function Page() {
  return (
    <table>
      <tbody>
        <tr>
          <th>
            <Link href="./basic">basic</Link>
          </th>
          <td>react-hook-formの基本的な使い方のみのフォーム</td>
        </tr>
        <tr>
          <th>
            <Link href="./custom">custom</Link>
          </th>
          <td>
            送信状況や送信結果などをUIに表示したユーザーフレンドリーなフォーム
          </td>
        </tr>
        <tr>
          <th>
            <Link href="./mui">mui</Link>
          </th>
          <td>MUI(Material UI)とreact-hook-formを使ったフォーム</td>
        </tr>
        <tr>
          <th>
            <Link href="./onsubmit-validate">onsubmit-validate</Link>
          </th>
          <td>
            onSubmiと送信ボタンにdisabledの組み合わせにより不具合が起きやすいフォーム
          </td>
        </tr>
      </tbody>
    </table>
  );
}
