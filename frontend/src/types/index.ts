export type User = {
  name: string
  email: string
  handle: string
  _id: string
  description: string
  image: string
  links: string
}

export type Handle = Pick<User, 'description' | 'handle' | 'image' | 'links' | 'name'>

export type RegisterForm = Pick<User, 'name' | 'handle' | 'email'> & {
  password: string
  password_confirmation: string
}

export type LoginForm = Pick<RegisterForm, 'email' | 'password'>

export type ProfileForm = Pick<User, 'handle' | 'description'>

export type SocialNetwork = {
  id: number
  name: string
  url: string
  enabled: boolean
}

export type DevTreeLink = Pick<SocialNetwork, 'name' | 'url' | 'enabled'>
