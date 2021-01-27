class TasksController < ApplicationController
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

  private
    def tasks_params 
      params.require(:task).permit(:title)
    end

end
