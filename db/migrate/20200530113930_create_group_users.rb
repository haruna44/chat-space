class CreateGroupUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :group_users do |t|            #groupという名前のテーブルを新たに作成
      t.references :group, foreign_key: true    #references方は、外部キーを追加するときに使う
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
