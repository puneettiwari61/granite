Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :tasks, except: %i[new edit]
  resources :users, only: %i[create index]
  # resources :sessions, only: %i[create destroy]

  root "home#index"
  get "*path", to: "home#index", via: :all

end
