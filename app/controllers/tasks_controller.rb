class TasksController < ApplicationController
  before_action :load_task, only: %i[show update]

  def index
    tasks = Task.all
    render status: :ok, json: { tasks: tasks }
  end

  def create
    @task = Task.new(tasks_params)
    if @task.save
      render status: :ok, json: { notice: "Task was successfully created" }
    else
      errors = @task.errors.full_messages
      render status: :unprocessable_entity, json: { errors: errors }
    end
  end

  def show
    render status: :ok, json: { task: @task}
  end

  def update
    if @task.update(tasks_params)
      render status: :ok, json: { notice: "Task was successfully updated" }
    else
      render status: :unprocessable_entity, json: { errors: @task.errors.full_messages }
    end
  end

  private
    def tasks_params 
      params.require(:task).permit(:title)
    end

    def load_task 
      @task = Task.find(params[:id])
      puts "#{@task} task from load_task"
      rescue ActiveRecord::RecordNotFound => errors
        render status: :not_found, json: { errors: errors}
    end

end
