class CreateGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :groups do |t|     #groupという名前のテーブルを新たに作成
      t.string :name, null: false   #text型のnameカラムを作成.空はダメ
      t.index :name, unique: true
      t.timestamps
    end
  end
end
