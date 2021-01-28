class TasksController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  before_action :load_task, only: %i[show update destroy]

  def index
    tasks = Task.all
    render status: :ok, json: { tasks: tasks }
  end

  def create
    @task = Task.new(tasks_params.merge(creator_id: @current_user.id))
    if @task.save
      render status: :ok, json: { notice: "Task was successfully created" }
    else
      errors = @task.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { errors: errors }
    end
  end

  def show
    render status: :ok, json: { task: @task, assigned_user: @task.user}
  end

  def update
    if @task.update(tasks_params)
      render status: :ok, json: { notice: "Task was successfully updated" }
    else
      render status: :unprocessable_entity, json: { errors: @task.errors.full_messages }
    end
  end

  def destroy
    if @task.destroy
      render status: :ok, json: { notice: 'Successfully deleted task.' }
    else
      render status: :unprocessable_entity, json: { errors: 
      @task.errors.full_messages }
    end
  end


  private
    def tasks_params 
      params.require(:task).permit(:title, :user_id)
    end

    def load_task 
      @task = Task.find(params[:id])
      puts "#{@task} task from load_task"
      rescue ActiveRecord::RecordNotFound => errors
        render status: :not_found, json: { errors: errors}
    end

end
