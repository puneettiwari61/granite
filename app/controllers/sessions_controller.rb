class SessionsController < ApplicationController
  def create
    user = User.find_by(email: login_params[:email].downcase)
    if user.present? && user.authenticate(login_params[:password])
      render status: :ok, json: {
        notice: "Successfully logged in!",
        auth_token: user.authentication_token, userId: user.id,
      }
    else
      render status: :unauthorized, json: {
        notice: "Incorrect credentials, try again.",
      }
    end
  end

  private

  def login_params
    params.require(:login).permit(:email, :password)
  end
end
