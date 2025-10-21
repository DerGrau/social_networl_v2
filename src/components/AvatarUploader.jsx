export default function AvatarUploader({ userId, url, onUpload }) {
  return (
    <div>
      {url ? (
        <img className="avatar" src={url} />
      ) : (
        <img className="avatar" src={""} alt="Аватар" />
      )}
    </div>
  );
}
