module UserDecorator
  def avatar_with_default(size: 48)
    if avatar.attached?
      avatar.variant(resize: "#{size}x#{size}")
    else
      Identicon.data_url_for(id, size)
    end
  end

  def name_with_default
    name.presence || screen_name
  end

  def role_value_for_update
    admin? ? 'member' : 'admin'
  end

  def role_label_for_update
    admin? ? 'Remove Admin' : 'Make Admin'
  end
end