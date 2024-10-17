const UserAvatar = ({ classNameFrame, width, height }) => {
  return (
    <div className={classNameFrame}>
      <img
        src='https://www.gravatar.com/avatar/999068a6dbcc836522fd6eb79bb9ad2b?s=48&d=identicon&r=PG&f=y&so-version=2'
        alt='user avatar'
        width={width}
        height={height}
      />
    </div>
  )
}

export default UserAvatar
