class TasksController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  before_action :load_task, only: %i[show update destroy]

  def index
    @tasks = policy_scope(Task)
    render status: :ok, json: {
      tasks: {
        pending: @tasks.organize(:pending).as_json(include: {
          user: {
            only: [:name, :id]
          }
        }),
        completed: @tasks.organize(:completed)
      }
    }
  end

  def create
    @task = Task.new(tasks_params.merge(creator_id: @current_user.id))
    authorize @task
    if @task.save
      puts "commentsunique"
      render status: :ok, json: { notice: "Task was successfully created" }
    else
      errors = @task.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { errors: errors }
    end
  end

  def show
    authorize @task
    comments = @task.comments.order("created_at DESC")
    render status: :ok, json: { task: @task, assigned_user: @task.user }
  end

  def update
    authorize @task
    if @task.update(tasks_params)
      render status: :ok, json: { notice: "Task was successfully updated" }
    else
      render status: :unprocessable_entity, json: { errors: @task.errors.full_messages }
    end
  end

  def destroy
    authorize @task
    if @task.destroy
      render status: :ok, json: { notice: "Successfully deleted task." }
    else
      render status: :unprocessable_entity, json: { errors: @task.errors.full_messages }
    end
  end

  private

  def tasks_params
    params.require(:task).permit(:title, :user_id, :progress, :status)
  end

  def load_task
    @task = Task.find(params[:id])
    puts "#{@task} task from load_task"
  rescue ActiveRecord::RecordNotFound => errors
    render status: :not_found, json: { errors: errors }
  end
end
