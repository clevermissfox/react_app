export default function AppleExplorer() {
  return (
    <div class="taskbar">
        <button data-name="Finder">
            <img  src="/assets/icons/apple/application-icons/icon-apple_finder-logo.png" alt="" />
        </button>
        <button className="btn-lg" data-name="Preview">
            <img  src="/assets/icons/apple/application-icons/icon-apple_preview-logo.png" alt="" />
        </button>
        <button className="btn-bg" data-name="Safari">
            <img className="img-cover" src="/assets/icons/apple/application-icons/icon-apple_safari-logo.svg" alt="" />
        </button>
        <button className="btn-bg" data-name="Photos">
            <img src="/assets/icons/apple/application-icons/icon-apple_photos-logo.webp" alt="" />
        </button>
        <button data-name="Trash">
            <img src="/assets/icons/apple/application-icons/icon-apple_trash-logo.png" alt="" />
        </button>
    </div>
  )
}