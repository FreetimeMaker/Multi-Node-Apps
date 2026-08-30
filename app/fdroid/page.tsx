export default function FdroidPage() {
  const fingerprint =
    '525AAD9B346F70388D96E281C061BC184B5AFEC35872BF1E140AD8063CC2A1C2';
  const repoUrl = 'https://free-time.me/fdroid/repo';

  return (
    <main>
      <h1>Freetime Repository</h1>
      <p>
        This is the Official F-Droid Repository from Freetime Maker for F-Droid.
        It includes Apps from Freetime Maker and others.
        It gets Updates from Freetime Maker directly, and faster, than the Official F-Droid Repository from F-Droid.
        It includes Apps that aren't in the F-Droid Repository yet.
      </p>
      <a href={`https://fdroid.link/#${repoUrl}?fingerprint=${fingerprint}`}>
        <img src="/fdroid/repo/index.png" alt="QR-Code for adding the repo" />
      </a>
      <p>Fingerprint (SHA-256) zur manuellen Verifizierung:</p>
      <code>{fingerprint}</code>
    </main>
  );
}